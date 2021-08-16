const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    let searchedPhrase = req.body.search_input;
    console.log(searchedPhrase);
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
