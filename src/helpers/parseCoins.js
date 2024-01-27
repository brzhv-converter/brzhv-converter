export const parseCoins = (coins = [], acceptableCoins) => {
    const parsedCoins = [];

    coins.forEach((coin) => {
        if (acceptableCoins[coin.symbol]) {
            parsedCoins.push({
                ...coin,
                wallet: acceptableCoins[coin.symbol].wallet
            });
        }
    })

    return parsedCoins;
}