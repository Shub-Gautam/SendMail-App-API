// Using the API:
//
// Once you setup the application
// Start the application by command "npm start"
// now you can go to localhost:8000 and follow the on screen instructions to use this API
//
// Working of the API:
//
//When you go to the localhost:8000/login then you are authorised using OAuth2
//after you provide the permissions to the application it will store the credentials
//in a json file present in Data folder
//
//After you authorize the application go to localhost:8000/sendmail to send a prebuild
//mail to "skgautam393@gmail" if you want to change the reciever's email just go to the
//Services/sendMail.js and change the "to" variable and paste your emailID
//
//localhost:8000/sendmail uses that saved file to extract information like accessToken
//

// import Node Modules------------------------------------------------------
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();

// importing custom function to send mail-----------------------------------
const sendMail = require("./Services/sendMail");
// importing custom middleware to get accessToken from authToken------------
const oAuth = require("./middleware/oAuth");

// Declaring Variables -----------------------------------------------------
const client_id =
  "790734464736-6m1q5ho9pp7uf6vfbv7jk04ms8l7gcpv.apps.googleusercontent.com";
const redirect_uri = "http://localhost:8000/credentials";
const response_type = "code";
const scope = "https://www.googleapis.com/auth/gmail.labels";
const client_secret = "9ckklpPF-G8-_hHSxKDPawta";
const tokenEndpoint = "https://oauth2.googleapis.com/token";
const port = process.env.PORT || 8000;
var path = "./Data/file.json";

//========================== Managing HTTP requests ========================

// Welcome HTTP request ****************************************************
app.get("/", (request, response) => {
  response.send(
    `hey there welcome to Send Mail API\n` +
      `This service has these functionalities:\n` +
      `1. Go to localhost://8000/login ------ this use OAuth2 to authorize user` +
      `\n2.After doing step 1 go to locahost://8000/sendmail ----- to send mail`
  );
});

// This is the API endpoint Called when you want to send email**************
app.get("/sendmail", (req, res) => {
  //--------Getting Data(Access_token) from "file.json" file--------
  let accessToken;
  fs.readFile("./file.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const file = JSON.parse(jsonString);
      accessToken = file.access_token;
      //   console.log(A_token);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

  //-------------calling sendMail function----------------------------
  sendMail(accessToken)
    .then((result) => console.log("email sent ... ", result))
    .catch((error) => console.log(error.message));

  res.send(
    `mail sent !!!!\nNote: Since you are directly accessing the API without any Visual Interface,` +
      ` you can not change Reciever's Address or the body of the mail.\n This functionality can be` +
      ` implemented in the client side (You are on the server side)\n If you still want to change the` +
      ` Reciever's address just follow the steps:\n1.Go to the project folder\n2.Go to Services/sendMail.js` +
      ` and change \"to\" variable \n`
  );
});

// This is the API endpoint called when you want to Authorize the user Using OAuth2
app.get("/login", (request, response) => {
  const accessurl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `response_type=${response_type}&` +
    `redirect_uri=${redirect_uri}&` +
    `client_id=${client_id}&` +
    `scope=${scope}`;
  console.log("working");

  // https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https://developers.google.com/oauthplayground&client_id=790734464736-6m1q5ho9pp7uf6vfbv7jk04ms8l7gcpv.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/gmail.labels
  // this url is generated to get auth tokken

  //   response.send("redirected to the google auth server");

  response.redirect(accessurl);
});

// Middleware used to exchange AuthToken with AccessToken
app.use(oAuth);

// This is the API endpoint to save the user credentials into a*******************
// file.json file *****************************************************************
app.get("/credentials", (request, response) => {
  const code1 = request.query.code;
  const { access_token } = request.oauth;
  const datatobestored = request.oauth;

  //   Storing the data to file.json
  const jsonString = JSON.stringify(datatobestored);
  fs.writeFile("./Data/file.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

  response.send(
    `Logged in successfully!!\n` +
      `Now you can send your mail via your Gmail` +
      `\nJust go to localhost://sendmail`
  );
});

// handling port -----------------------------------------------------------
app.listen(port, () => {
  console.log(`listening on port${port}`);
});

// Build By Shubham Gautam
