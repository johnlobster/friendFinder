// create express routes for api


// also contains logic for testing compatability

// set up array and get any existing data
var friendsData = require( "../data/friends");

function findFriend( friend, allFriends) {
    let minCompatability = 1000; // arbitrarily high number
    let compatabilityIndex = 0;
    for( let i=0 ; i < allFriends.length ; i++ ) {
        let compatability = 0;
        for( let j=0; j < 10 ; j++ ) {
             compatability += Math.abs(friend.scores[j] - allFriends[i].scores[j])
        }
        if (compatability < minCompatability) {
            minCompatability = compatability;
            compatabilityIndex = i;
        }
    }
    return allFriends[compatabilityIndex];
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
            res.json({success: true, fData: friendsData});
        } else {
            res.json({success: false});
        }

    });

    // admin deletes a record, returns new friendsData array
    app.delete("/api/admin", (req, res) => {
        // remove that row
        friendsData.splice(req.body.row,1);
        // send new array to client
        res.json({ success: true, fData: friendsData });

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
        // having a lot of trouble getting scores back as an array of numbers, so convert manually
        let newFriend = { name: req.body.name, scores: []};
        // console.log(newFriend);
        // console.log(req.body);
        for( let i=0; i < 10 ; i++) {
            newFriend.scores.push(parseInt(req.body.scores[i]));
        }
        console.log(newFriend);
        // console.log("Request\n-------------");
        // console.log(req);
        let matchedFriend = findFriend( newFriend, friendsData);
        // add the new friend of finding the match, so doesn't match themself
        friendsData.push(newFriend);
        res.json( matchedFriend);

    });
};