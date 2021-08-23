const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    let url = "https://api.spoonacular.com/recipes/random?number=9&apiKey=63c9ee7c9738400d8ac175998bec5de9";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('index', { recipeData: data });
        })
});

app.get("/query/:queryPhrase", (req, res) => {

    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=63c9ee7c9738400d8ac175998bec5de9&addRecipeInformation=true&query="
        + req.params.queryPhrase + "&number=9";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('result', { searchedPhrase: req.params.queryPhrase, recipeData: data });
        })

});

app.get("/recipe/:recipeID", (req, res) => {
    let url = "https://api.spoonacular.com/recipes/" + req.params.recipeID + "/information?apiKey=63c9ee7c9738400d8ac175998bec5de9";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            res.render("recipe-page", { recipe: data })
        });
});

app.post("/", function (req, res) {
    let searchedPhrase = req.body.search_input;
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