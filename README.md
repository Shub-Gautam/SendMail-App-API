# Send Mail API for Quickwork

This API helps in authorizing the application by using Oauth2.0 and after authorization you can send email from your account on behalf of this API.

## Setting up the API on your local machine:

1. Clone or Download the project
2. Setup the project and run command "npm start"

---

## Using the API :

1. Go to localhost:8000/ and follow the on screen instructions.

## Working of the API:

There are three API endpoints in this Application

1. localhost:8000/ this is just a welcome screen for this application
2. localhost:8000/login this is the endpoint used for Auth
3. localhost:8000/credentials this is the api endpoint used in the process of authorization.
4. localhost:8000/sendmail this is the endpoint to send a brebuilt mail to a sender which is predefined in the code ,follow the code comments to change reciever's email.

### Internal working of OAuth2.0

When you go to localhost:8000/login , this api endpoint will redirect you to the google authorization server after you authorize the application google server will send us a AuthToken (with the help of localhost:8000/credentials) this auth token is then used to exchange with AccessToken once we get the accesstoken we call the gmail API to send mail
