import { GET } from "./HttpsService"

const PATH = {
    getPrices: 'https://api.binance.com/api/v3/ticker/price',
    getAccaptableCoins: 'https://k581rc3wm2.execute-api.us-east-1.amazonaws.com/dev/get-coins'
}

export const getCoins = (id) => (
    GET({ path: `${PATH.getPrices}${id ? `?symbol=${id}` : ''}`, skipBase: true })
    .then((response) => response.json())
)

export const getAccaptableCoins = () => (
    GET({ path: PATH.getAccaptableCoins, skipBase: true })
    .then((response) => response.json())
)