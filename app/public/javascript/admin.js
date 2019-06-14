// Javascript file for FriendFinders loaded into admin.html

$(document).ready(function () {

var authenticated = false;

// handle name/password submission
$("#submitButton").on("click", (event) => {
    event.preventDefault(); // stop from posting and reloading page
    $("#warningSpan").attr("display", "none");

    let name = $("#nameInput").val().trim();
    if (name === "") {
        // no name entered, do not post form
        $("#warningSpan").text("No name entered : ");
        $("#warningSpan").attr("display", "inline");

    }
    else {
        // post to api and receive response from server

        $.ajax("/api/admin/password", {
            type: "POST",
            data: { 
                name: name,
                password: $("#pwInput").val().trim()
            }
        }).done((data) => {
            if ( data.success) {
                console.log("ok password");
            }
            else {
                // bad password
                console.log("bad password");
                $("#warningSpan").text("Incorrect password : ");
                $("#warningSpan").attr("display", "inline");
            }
        });
    }

});




}); // end document ready