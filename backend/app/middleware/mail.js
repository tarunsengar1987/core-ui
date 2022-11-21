var nodemailer = require("nodemailer");

const sendMail = async (user, password, settingData, settingPassword, isRegister) => {
  console.log("sendMaiOfUser", settingData);

  var transporter = nodemailer.createTransport({
    host: "server290.web-hosting.com",
    port: settingData.port,
    secure: true, // true for 465, false for other ports
    auth: {
      user: settingData.smtp, // generated ethereal user
      pass: settingPassword, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  if (!isRegister) {
    var link = "http://localhost:3000/confirm/" + user.id;

    await transporter.sendMail({
      from: settingData.smtp,
      to: user.email,
      subject: "Sending Email using Node.js",
      html:
        '<h2 style="color:#ff6600;">Hello!' +
        user.username +
        " </h2><a href=" +
        link +
        ">Please click to verifty Your account</a><p>Email:-" +
        user.email +
        "</p><p>Password:-" +
        password +
        "</p>",
    });
  } else {
    var link = "http://localhost:3000/resetpassword/" + user.id;

    await transporter.sendMail({
      from: settingData.smtp,
      to: user.email,
      subject: "Sending Email using Node.js",
      html:
        '<h2 style="color:#ff6600;">Hello!' +
        user.username +
        " </h2><a href=" +
        link +
        ">Please click here to reset password</a>",
    });
  }
};

const mail = {
  sendMail: sendMail,
};

module.exports = mail;
