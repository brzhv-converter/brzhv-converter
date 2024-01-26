import { useEffect, useState } from "react"
import Graph from "./Graph"

const GraphLayout = ({
    coins = []
}) => {
    const [coinsHistory, updateCoinsHistory] = useState();

    const appendCoins = (_coins) => {
        const currentCoins = _coins.reduce((obj, coin) => {
            obj[coin.symbol] = coin.price;
            return obj;
        }, {});

        console.log(currentCoins)
    }

    useEffect(() => {
        appendCoins(coins)
    }, [coins]);

    return (
        <div className="w-full relative">
            <h2 className="w-full mb-[20px]">
                Realtime
            </h2>
            <Graph

            />
        </div>
    )
}

export default GraphLayout