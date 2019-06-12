// create express routes for api

// also contains logic for testing compatability

// set up array and get any existing data
var friendsData = require( "../data/friends");

function findFriend( friend, allFriends) {

}

module.exports = function (app) {

    // return data on all friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData)
    });

    app.post("/api/friends", function (req, res) {
    });
};