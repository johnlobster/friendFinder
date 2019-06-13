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

    // check the admin password
    app.post("api/admin/password", (req,res) => {

    });

    // return information on a particular friend
    app.post("/api/friends/:friend", function (req, res) {
        let notFound = true;
        for (let i=0; i < friendsData.length; i++) {
            if ( friendsData[i].name === req.params.name) {
                res.json(friendsData[i]);
                notFound = false;
            }
        }
        if (notFound) {
            res.json({error:"Could not find friend " + req.params.name});
        }
    });
};