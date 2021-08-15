const nodemailer = require("nodemailer");

const client_id =
  "790734464736-6m1q5ho9pp7uf6vfbv7jk04ms8l7gcpv.apps.googleusercontent.com";
const to = "skgautam260@gmail.com";
const client_secret = "9ckklpPF-G8-_hHSxKDPawta";

async function sendMail(accessToken, senderEmail, refresh_token) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: senderEmail,
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Yours truly <${senderEmail}>`,
      to: `${to}`,
      subject: "hello from gmail using API",
      text: "hello from gmail........",
      html: "<h1>Welcome to my new redesign........",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = sendMail;
// Build By Shubham Gautam
