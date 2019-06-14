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
            " class='deleteBtn btn btn-sm btn-danger ' data-row='" + i + "'>delete</button></td>");
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
                // hide the login
                $("#authentication").hide();
                // add table to html
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

// note => function notation doesn't work here as $(this) is handled incorrectly
$(document).on("click", ".deleteBtn", function (event) {
    console.log("Delete");
    let row = $(this).attr("data-row");
    $.ajax("/api/admin", {
        type: "DELETE",
        data: {
            row: row
        }
    }).done((data) => {
        if (data.success) {
            // console.log("ok password");
            // password approved, returns array of all friends data
            // clear table before adding new data
            $("#tableBody").empty();
            htmlTable(data.fData);
        }
        else {
            // failed to delete data
            console.log("Data row " + row + " was not deleted") ;           
        }
    });
    
});



}); // end document ready