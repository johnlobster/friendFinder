// node.js server to run friendFinder

const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// listen on port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});