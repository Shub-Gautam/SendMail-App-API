const oAuth = (req, res, next) => {
  var code1 = req.query.code;

  if (!code1) {
    res.status(401).send("Missing authorization Code");
  }

  const params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("code", code1);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", redirect_uri);

  //   console.log(params);

  axios
    .post(tokenEndpoint, params)
    .then((response) => {
      //   console.log(response.data);
      req.oauth = response.data;
      console.log("successfully called for access token");
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json(`Reason: ${err.message}`);
    });
};

module.exports = oAuth;
// Build By Shubham Gautam
