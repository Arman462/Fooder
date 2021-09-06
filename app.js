const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { data } = require('jquery');

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    let url = "https://api.spoonacular.com/recipes/random?number=9&apiKey=63c9ee7c9738400d8ac175998bec5de9";
    let statusCode = 200;
    fetch(url)
        .then(res => {
            statusCode = res.status;
            // statusCode = 400;
            console.log(statusCode);
            return res.json();
        })
        .then(randomRecipes => {
            res.render('index', { recipeData: randomRecipes, statusCode: statusCode });
        })
});

app.get("/query/:queryPhrase/:pageNumber", (req, res) => {
    let searchedPhrase = req.params.queryPhrase;
    let pageNumber = req.params.pageNumber;
    let offset = (pageNumber - 1) * 9;
    let statusCode = 200;

    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=63c9ee7c9738400d8ac175998bec5de9&addRecipeInformation=true&query="
        + searchedPhrase + "&number=9" + "&offset=" + offset;

    fetch(url)
        .then(res => {
            statusCode = res.status;
            return res.json();
        })
        .then(recipeData => {
            let totalPages = Math.ceil(recipeData.totalResults / 9);
            let options = {
                searchedPhrase: searchedPhrase,
                recipeData: recipeData,
                totalPages: totalPages,
                currentPage: pageNumber,
                statusCode: statusCode,
            }

            res.render('result', options);
        })

});

app.get("/recipe/:recipeID", (req, res) => {
    let url = "https://api.spoonacular.com/recipes/" + req.params.recipeID + "/information?apiKey=63c9ee7c9738400d8ac175998bec5de9";
    statusCode = 200;
    fetch(url)
        .then(res => {
            statusCode = res.status;
            return res.json();
        })
        .then(recipeInfo => {
            res.render("recipe-page", { recipe: recipeInfo, statusCode: statusCode })
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