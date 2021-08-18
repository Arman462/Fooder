const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get("/query/:queryPhrase", (req, res) => {
    console.log("hey");

    // let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=63c9ee7c9738400d8ac175998bec5de9&query="
    // + req.params.queryPhrase;

    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=63c9ee7c9738400d8ac175998bec5de9&query=pasta&number=1";
    let recipes = [];

    for (let i = 0; i < 9; i++) {
        url = url + "&offset=" + i;

        https.get(url, function (response) {
            response.on("data", function (data) {
                let recipe = JSON.parse(data);
                // console.log(typeof recipe);
                recipes.push(recipe);
                // console.log(recipe);
            })
        })

        url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=63c9ee7c9738400d8ac175998bec5de9&query=pasta&number=1";
    }

    console.log(recipes[0]);

    res.render("result", { searchedPhrase: req.params.queryPhrase });
});

app.post("/", function (req, res) {
    let searchedPhrase = req.body.search_input;
    console.log(searchedPhrase);
    res.redirect("/query/" + searchedPhrase);
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}