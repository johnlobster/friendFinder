// create express routes to serve html pages

const path = require("path");
const express = require("express");



module.exports = function (app) {

    // get static files
    app.use(express.static('../public'));
    
    // get a list of all friends for administration. Page will prompt for
    // password, then make an api request to get all the friends
    app.get("/admin", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/admin.html"));

    });
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // default
    app.get("/*", (req,res) => {
        res.status(404).end();
    });
};

