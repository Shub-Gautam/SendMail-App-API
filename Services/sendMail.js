const nodemailer = require("nodemailer");

const client_id =
  "790734464736-6m1q5ho9pp7uf6vfbv7jk04ms8l7gcpv.apps.googleusercontent.com";
const mailer = "skgautam260@gmail.com";
const to = "skgautam393@gmail.com";
const client_secret = "9ckklpPF-G8-_hHSxKDPawta";

async function sendMail(accessToken) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "skgautam260@gmail.com",
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken:
          "1//04BSc6d8OLkwgCgYIARAAGAQSNwF-L9Irks3Vamu1B5IPb7bwUua5NZ20DRekAsZa3INcmKdsmuadPzI1CWoiRHi5jx7auNhUozA",
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Yours truly <${mailer}>`,
      to: `${to}`,
      subject: "hello from gmail using API",
      text: "hello from gmail........",
      html: "<h1>New hello from gmail new this time........",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
// Build By Shubham Gautam
