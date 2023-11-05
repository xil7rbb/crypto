import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const APIPrice24 = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol="
const allCryptos = ["BTC", "ETH", "BNB", "XRP", "SOL", "ADA", "DOGE", "TRX", "OP", "LINK", "MATIC", "DOT", "LTC", "BCH", "SHIB", "AVAX", "ARB", "XLM", "XMR", "ATOM", "NEAR", "UNI", "ICP", "FIL", "HBAR", "APT", "INJ", "VET"];
const toCompareCrypto = ["USDT", "BTC", "ETH"];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        allCryptos: allCryptos,
        toCompareCrypto: toCompareCrypto,
    })
})

app.post("/", async (req, res) => {
    let crypto1 = req.body["crypto1"];
    let crypto2 = req.body["crypto2"];
    try {
        const responsePrice = await axios.get(APIPrice24 + crypto1 + crypto2);
        const resultPrice = responsePrice.data;
        console.log(resultPrice);
        res.render("index.ejs", {
            allCryptos: allCryptos,
            toCompareCrypto: toCompareCrypto,
            result: resultPrice,
            crypto1: crypto1,
            crypto2: crypto2,})
    } catch (error) {
        if (crypto1 == crypto2) {
            let h2 = "Impossible to compare the two same cyptos, please select different cryptos to compare";
            res.render("index.ejs", {
                allCryptos: allCryptos,
                toCompareCrypto: toCompareCrypto,
                h2: h2});
        } else {
            if (error == "AxiosError: Request failed with status code 400") {
                error = "This two cryptos can't be compare, please select another pair which can be tradable";
            res.render("index.ejs", {
                allCryptos: allCryptos,
                toCompareCrypto: toCompareCrypto,
                error: error});
        } else {
            console.log(error);
            res.redirect("/");
        }}
    }

})



app.listen(port, () => {
    console.log(`Running on port ${port}`);
});


// API for Price = https://data-api.binance.vision/api/v3/avgPrice?symbol=BTCUSDT