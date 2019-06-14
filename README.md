# friendFinder

A client/server app that takes input from user and then checks against other friends in database to find the best match

Notes:
* no database is used, data held in memory
* to log in to admin page, any name can be used and the password is `password`
* data is seeded with three names

#### Technologies and node modules
* javascript
* GitHub
* node.js
* express
* html
* bootstrap
* Heroku

#### Deployed

<https://heroku>

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

Fill in name (required) and picture url (not required). There are 10 questions to answer, 
the answers are controlled by radio buttons (default is 1). Submit will then send your data to the server and
a popup modal will then show the friend that matches best.

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

