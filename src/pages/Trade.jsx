import { useNavigate } from "react-router-dom";
import Background from "../components/Background"
import { verifyToken } from "../services/AuthService";
import { useContext, useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import Spinner from "../components/Spinner";
import { getCoins } from "../services/BinanceService";
import { parseCoins } from "../helpers/parseCoins";
import { Cointext } from "../App";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import joinClassNames from "../helpers/joinClassNames";

const amountRegexp = /^\d+(\.\d+)?$/;

const Trade = () => {
    const [userEmail, updateUserEmail] = useState();
    const [coins, updateCoins] = useState([]);

    const [fromCoin, updateFrom] = useState();
    const [amount, updateAmount] = useState('');
    const [toCoin, updateTo] = useState();

    const isAmount = !!amount.match(amountRegexp);
    const isValid = fromCoin && isAmount && toCoin;
    const [isAmountFocused, updateAmountFocused] = useState(false);

    const [isRequested, updateIsRequested] = useState(false);

    const accaptableCoins = useContext(Cointext);

    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem('session');

        if (!session) {
            navigate('/sign-in')
        }

        verifyToken({ token: session })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
                .then((data) => updateUserEmail(data?.email))   
            } else {
                navigate('/sign-in')
            }
        })
        .catch(() => {
            navigate('/sign-in')
        })
    }, [navigate])

    useEffect(() => {
        if (Object.keys(accaptableCoins).length === 0) return;

        getCoins().then((localPrices) => {
            const parsedCoins = parseCoins(localPrices, accaptableCoins);
            updateCoins(parsedCoins);
        })
    }, [updateCoins, accaptableCoins])

    const request = () => {
        updateIsRequested(true);
    }

    return (
        <main className="relative">
            <Background />
            <CardWrapper>
                {(userEmail) ? (
                    <div>
                        <h2 className="w-full mb-[20px]">
                            Trade
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-4 mb-3">
                            <div className="flex flex-col gap-3">
                                <h4>
                                    I want:
                                </h4>
                                <Dropdown
                                    options={coins}
                                    parser={(option) => option.symbol}
                                    alterParser={(option) => option.price}
                                    onSelect={(option) => updateFrom(option)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h4>
                                    Of amount:
                                </h4>
                                <input
                                    className={joinClassNames(
                                        "!min-w-0 !h-[38px]",
                                        !isAmount && isAmountFocused && '!border-red-500 !text-red-500 placeholder:text-red-500 placeholder:opacity-40'
                                    )}
                                    placeholder="0.00"
                                    onChange={(e) => updateAmount(e.target.value)}
                                    onFocus={() => updateAmountFocused(true)}
                                    maxLength={10}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h4>
                                    To convert into:
                                </h4>
                                <Dropdown
                                    options={coins}
                                    parser={(option) => option.symbol}
                                    alterParser={(option) => option.price}
                                    onSelect={(option) => updateTo(option)}
                                />
                            </div>
                        </div>
                        <Button
                            disabled={isRequested || !isValid}
                            onClick={request}
                        >
                            Request convertation
                        </Button>
                        <div className="mt-[20px]">
                            Here will be graph
                        </div>
                    </div>
                ) : (
                    <Spinner />
                )}
            </CardWrapper>
        </main>
    )
}

export default Trade