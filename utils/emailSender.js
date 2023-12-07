//import moduls
const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

//details of transporter
const transporterDetails = smtpTransport({
  service: "service that send email by it",
  auth: {
    user: "my email",
    pass: "my pass",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//email sender function
const emailSender = (email, subject, text) => {
  const transporter = nodeMailer.createTransport(transporterDetails);

  transporter.sendMail(
    {
      from: "mydeveloperemail@yahoo.com",
      to: email,
      subject,
      text,
    },
    (error, info) => {
      if (error) return console.log(error); //*if get error then print error details in terminal
      console.log(info); //* if everything was ok then print details in terminal
    }
  );
};

//export module
module.exports = emailSender;
