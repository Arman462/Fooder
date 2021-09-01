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

app.get("/query/:queryPhrase/:pageNumber", (req, res) => {
    pageNumber = req.params.pageNumber;

    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=63c9ee7c9738400d8ac175998bec5de9&addRecipeInformation=true&query="
        + req.params.queryPhrase + "&number=9" + "&offset=" + (pageNumber - 1) * 9;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let totalPages = Math.ceil(data.totalResults / 9);
            res.render('result', { searchedPhrase: req.params.queryPhrase, recipeData: data, totalPages: totalPages, currentPage: pageNumber });
        })

});

app.get("/recipe/:recipeID", (req, res) => {
    let url = "https://api.spoonacular.com/recipes/" + req.params.recipeID + "/information?apiKey=63c9ee7c9738400d8ac175998bec5de9";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render("recipe-page", { recipe: data })
        });
});

app.post("/", function (req, res) {
    let searchedPhrase = req.body.search_input;
    if (searchedPhrase.includes("/") || searchedPhrase.includes("?")) {
        searchedPhrase = searchedPhrase.replace(/\//g, " ");
        searchedPhrase = searchedPhrase.replace(/\?/g, " ");
    }
    res.redirect("/query/" + searchedPhrase + "/1");
});

app.use((req, res) => {
    res.render('404')
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server is running on port 3000");
});