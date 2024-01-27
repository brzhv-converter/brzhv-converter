import { useNavigate } from "react-router-dom";
import Background from "../components/Background"
import { verifyToken } from "../services/AuthService";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import Spinner from "../components/Spinner";
import { getCoins } from "../services/BinanceService";
import { parseCoins } from "../helpers/parseCoins";
import { Cointext } from "../App";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import joinClassNames from "../helpers/joinClassNames";
import { ROUTES } from "../constants/routes";
import useModal from "../hooks/useModal";
import { Line } from "../components/Line";

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
            navigate(ROUTES.signIn)
        }

        verifyToken({ token: session })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
                .then((data) => updateUserEmail(data?.email))   
            } else {
                navigate(ROUTES.signIn)
            }
        })
        .catch(() => {
            navigate(ROUTES.signIn)
        })
    }, [navigate])

    const getPrices = useCallback(() => {
        getCoins().then((localPrices) => {
            const parsedCoins = parseCoins(localPrices, accaptableCoins);
            updateCoins(parsedCoins);
        })
    }, [accaptableCoins])

    useEffect(() => {
        if (Object.keys(accaptableCoins).length === 0) return;

        getPrices();

        const interval = setInterval(getPrices, 30000);
        return () => clearInterval(interval);
    }, [updateCoins, accaptableCoins, getPrices])

    const request = () => {
        updateIsRequested(true);
        open();
    }

    const { Modal, open } = useModal({ onClose: () => updateIsRequested(false) });
    const [modalWallet, updateModalWallet] = useState();
    const [isModalRequesting, updateIsModalRequesting] = useState(false);

    const usdAmount = useMemo(() => amount * fromCoin?.price, [fromCoin, amount])
    const toAmount = useMemo(() => usdAmount * toCoin?.price, [toCoin, usdAmount]);

    const onModalRequest = () => {
        updateIsModalRequesting(true);
        const params = {
            user: userEmail,
            userProvidedWallet: modalWallet,
            fromCoin: fromCoin.symbol,
            fromCoinWallet: fromCoin.wallet,
            toCoin: toCoin.symbol,
            toCoinWallet: toCoin.wallet,
            fromAmount: amount,
            usdAmount,
            toAmount,
        }

        console.log(params)
    }

    return (
        <main className="relative">
            <Modal>
                <CardWrapper>
                    {!isModalRequesting ? (
                        <div
                            className="max-w-[30vw] flex flex-col gap-4 items-center"
                        >
                            <h3 className="text-center">
                                {`After sending a request you will need to send ${amount} of ${fromCoin?.symbol} to your temporary wallet (equivalent of ${Math.ceil(usdAmount * 100) / 100} USD):`}
                            </h3>
                            <Line />
                            <p className="text-center">
                                {toCoin?.wallet}
                            </p>
                            <Line />
                            <h4 className="text-center text-slate-500 italic">
                                As our system is revisioned by managers real time, you are advised to specify wallet, from which you are planning to send convertation amount:
                            </h4>
                            <input
                                key='modal_wallet'
                                value={modalWallet}
                                onChange={(e) => updateModalWallet(e.target.value)}
                                placeholder="Paste your wallet..."
                                maxLength={50}
                            />
                            <Button
                                onClick={onModalRequest}
                                disabled={isModalRequesting}
                            >
                                Confirm request
                            </Button>
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </CardWrapper>
            </Modal>
            <Background />
            <CardWrapper>
                {(userEmail) ? (
                    <div>
                        <h2 className="w-full mb-[20px]">
                            Trade
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
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
                                    {`Of amount (from coins):`}
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
                        {/* <div className="mt-[20px]">
                            <GraphLayout
                                coins={coins}
                            />
                        </div> */}
                    </div>
                ) : (
                    <Spinner />
                )}
            </CardWrapper>
        </main>
    )
}

export default Trade