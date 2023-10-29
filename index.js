import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const APIPrice = "https://data-api.binance.vision/api/v3/avgPrice?symbol=";

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/", async (req, res) => {
    let crypto1 = req.body["crypto1"];
    let crypto2 = req.body["crypto2"];
    try {
        const response = await axios.get(APIPrice + crypto1 + crypto2);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {result})
    } catch (error) {
        if (crypto1 == crypto2) {
            let h1 = "Impossible to compare the two same cyptos, please select different cryptos to compare";
            res.render("index.ejs", {h1});
        } else {
            if (error == "AxiosError: Request failed with status code 400") {
                error = "This two cryptos can't be compare, please select another pair which can be tradable";
            res.render("index.ejs", {error});
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