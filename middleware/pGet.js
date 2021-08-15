const axios = require("axios");

const pGet = (req, res, next) => {
  var idtoken = req.oauth.id_token;

  const params = new URLSearchParams();
  params.append("id_token", idtoken);

  axios
    .post("https://oauth2.googleapis.com/tokeninfo", params)
    .then((response) => {
      req.personalinfo = response.data;
      console.log("data added successfully");
      next();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = pGet;
// Build By Shubham Gautam
