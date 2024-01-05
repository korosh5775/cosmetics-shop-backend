// Import necessary modules
// ------------------------------------------------
const nodeMailer = require("nodemailer"); // Library for sending emails
const smtpTransport = require("nodemailer-smtp-transport"); // SMTP transport plugin

// Configure email transporter
// ------------------------------------------------
const transporterDetails = smtpTransport({
  service: "service that send email by it", // Replace with the actual email service provider
  auth: {
    user: "my email", // Replace with your email address
    pass: "my pass", // Replace with your email password
  },
  tls: {
    rejectUnauthorized: false, // Disable TLS certificate checking for development (not for production!)
  },
});

// Define email sender function
// ------------------------------------------------
const emailSender = (email, subject, text) => {
  const transporter = nodeMailer.createTransport(transporterDetails); // Create a transporter instance

  transporter.sendMail({
    from: "mydeveloperemail@yahoo.com", // Sender's email address
    to: email, // Recipient's email address
    subject, // Email subject
    text, // Email body text
  }, (error, info) => {
    if (error) {
      console.log(error); // Log any errors
    } else {
      console.log(info); // Log email sending details
    }
  });
};

// Export the emailSender function
// ------------------------------------------------
module.exports = emailSender;
