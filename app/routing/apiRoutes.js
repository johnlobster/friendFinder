// create express routes for api


// also contains logic for testing compatability

// set up array and get any existing data
var friendsData = require( "../data/friends");

function findFriend( friend, allFriends) {
    return allFriends[0];
}

module.exports = function (app) {

    // return data on all friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData)
    });

    // check the admin password
    app.post("/api/admin/password", (req,res) => {
        console.log("admin sent password");
        if (req.body.password === "password") {
            // valid password
            console.log("Correct password");
            res.json({success: true, data: friendsData});
        } else {
            res.json({success: false});
        }

    });

    // get data on a specific friend
    app.get("/api/friends/:friend", function (req, res) {
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

    // submit new friend and return best match
    app.post("/api/newfriend", (req,res) => {
        let newFriend = req.body;
        console.log(newFriend);
        let matchedFriend = findFriend( newFriend, friendsData);
        res.json( matchedFriend);

    });
};