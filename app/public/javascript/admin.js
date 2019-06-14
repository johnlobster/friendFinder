// Javascript file for FriendFinders loaded into admin.html

$(document).ready(function () {

var authenticated = false;

// functions
// appends table body into table
function htmlTable (dataArr) {
    for (let i = 0; i < dataArr.length; i++) {
        let newRow = $("<tr>");
        newRow.append("<td>" + dataArr[i].name + "</td>");
        // add delete button
        newRow.append("<td><button type='button'" +
            " class='deleteBtn btn btn-sm btn-danger ' data-val='" + i + "'>delete</button></td>");
        newRow.append("<td>" + JSON.stringify(dataArr[i].scores) + "</td>");
        newRow.append("</tr>");
        $("#tableBody").append(newRow);

    }
}
    
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
                // console.log("ok password");
                // password approved, returns array of all friends data
                htmlTable(data.fData);
            }
            else {
                // bad password
                console.log("bad password");
                $("#warningSpan").text("Incorrect password : ");
                $("#warningSpan").attr("display", "inline");
                $("#pwInput").val("");
            }
        });
    }

});
$(".deleteBtn").on("click", (event) => {
    console.log("Delete");
    console.log($this);
});



}); // end document ready