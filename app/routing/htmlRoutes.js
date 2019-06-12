// create express routes to serve html pages (could have used express static setup)

const path = require("path");


module.exports = function (app) {
    
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};

