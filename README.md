# friendFinder

A client/server app that takes input from user and then checks against other friends in database to find the best match

Notes:
* no database is used, data held in memory
* to log in to admin page, any name can be used and the password is `password`
* data is seeded with three names

#### Technologies and node modules
* javascript
* jQuery
* GitHub
* node.js
* express
* html
* bootstrap
* Heroku

#### Deployed

<https://guarded-scrubland-84294.herokuapp.com/>

Note - heroku apps are paused if not in use, will take 10-15 seconds for it to restart

#### Github repository
<https://github.com/johnlobster/friendFinder.git>

#### Running locally

clone the master repo, cd to friendFinder directory

`npm install` will install all the node modules

`node server` will start the server

Browse to `http://localhost:8080/`

Static files are served from app/public.

#### User/Admin guide

##### user
From the front page press the survey button, this will take you to the survey page

Fill in name (required) and picture url (not required). If picture url is not supplied, then you get an image of Shrek's donkey. There are 10 questions to answer, 
the answers are controlled by radio buttons (default is 1). Submit will then send your data to the server and
a popup modal will then show the friend that matches best.

Picture urls are tricky to find - many images are part of an anchor that takes the user to a different web page, so the url will not show as a picture. To give users some pictures to try, the following urls will work
```
/images/shrek.jpg
/images/fiona.jpg
/images/donkey.jpg
/images/farquaad.jpg

```

##### admin
For admin, press the admin button at the bottom of each page. This sends you to /admin. And a name and password must be entered to view all the friend data. 

At present name (required) can be anything and the password is always __password__

A table of the friend data will then be shown and each line has a delete button so the admin can delete data.
This data cannot be recovered.

Login is required every time the admin page is visited

#### Results
Results can be found in the results sub-directory.
`results/README.txt` has details

#### Design notes

* Had a problem with passing an array of numbers (scores from survey) back to server. Parsing at the server end created an array of strings. No idea why this happened, and could not find any answers through google. Fixed by manually parsing the array of strings and converting to integers. Solution is in `apiRoutes.js`

