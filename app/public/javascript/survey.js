// Javascript file for FriendFinders loaded into survey.html

$(document).ready(function () {

var surveyQuestions = [
    "How much do you like toast ?",
    "Are you a morning person ?",
    "How much do you like the movie Shrek ?",
    "Do you like loud music ?",
    "Do you like Qentin Tarantino moves ?",
    "How much do you like chocolate ?",
    "Are you scared of the dark ?",
    "Do you like scary movies ?",
    "Do you like rap ?",
    "How much do you like Brocolli ?"
]

// add all questions into the html form



var radioString = "";
// create radio buttons for each question
for ( let i=0; i < surveyQuestions.length; i++) {
    // ask question
    $("#surveyForm").append("<h5>" + surveyQuestions[i] + "</h5>");
    // 
    // create a string holding html for radio buttons selecting 1-5
    radioString = '<div class="form-check form-check-inline">';
    // first one is checked
    radioString += '<input checked class="form-check-input" name="radio' + i +'" type="radio" id="radioQ'+ i + 'select' + 1 + '" value="Q' + i + 'chose' + 1 + '" >';
    radioString += '<label class="form-check-label mr-3" for="radioQ' + i + 'select' + 1 + '" >' + 1 + '</label >';
    // remaining 4
    for (let j = 2; j < 6; j++) {
        radioString += '<input class="form-check-input" name="radio' + i + '" type="radio" id="radioQ' + i + 'select' + j + '" value="Q' + i + 'chose' + j + '" >';
        radioString += '<label class="form-check-label mr-3" for="radioQ' + i + 'select' + j + '" >' + j + '</label >';
    } 
    radioString += "</div>";
    // add to html
    $("#surveyForm").append(radioString);

}

var answer = "";
var answerArr = [];
var name="";
var postObject = {};
var imageUrl = "";

// respond to survey button, post survey results to api
$("#submitButton").on("click", (event) => {
    event.preventDefault(); // stop from posting and reloading page
    console.log("Form submitted");
    // get and check name data
    name = $("#nameInput").val().trim();
    if ( name === "") {
        // no name entered, do not post form

    }
    else {
        // get data from radio buttons, iterate over questions
        answerArr = []; // clear array before filling it
        for (let i = 0; i < surveyQuestions.length; i++) {
            answer = $("input[name=radio" + i + "]:checked").val();
            // console.log("Question " + i + " " + answer);
            answer = answer.slice(-1); // get last character
            answerArr.push(parseInt(answer)); // convert to a number
        }
        // get image
        imageUrl = $("#pictureUrlInput").val().trim();
        if( imageUrl === "") {
            // no image supplied, use donkey instead
            imageUrl= "/images/donkey.jpg"
        }
        
        // build object to be posted
        postObject = {
            name: name,
            scores: answerArr,
            imageUrl: imageUrl
        }

        // post to api and receive response from server
        $.ajax("/api/newfriend", {
            type: "POST",
            data: JSON.stringify(postObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done( (data) => {
            // set up friend result modal
            $("#newFriendName").text(data.name);
            $("#modalFriendName").text(data.name);
            $("#modalYou").text(name);
            // display pictures
            $("#modalYourPicture").attr("src", imageUrl)
            $("modalFriendPicture").attr("src", data.imageUrl);

            // display friend result modal
            $("#newFriendModal").modal({
                show: true
            });
        });
        
    }

    
});

}); // end document ready