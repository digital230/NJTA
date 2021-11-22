const nodemailer = require("nodemailer");
const { smtp } = require("../config/smtp");

const { verificationEmail } = require("./email-templates/verification");
const { submissionTemplate } = require("./email-templates/submissionTemplate");

const sendSubmissionEmail = (email, subject, name, link) => {
  const emailHtml = submissionTemplate(name, link);
  const SMTP = {
    auth: smtp.auth,
    from: smtp.from,
    host: smtp.host,
    port: smtp.port,
    secure: true,
  };
  const transporter = nodemailer.createTransport(SMTP);

  const mailOptions = {
    from: "New Jersey Theatre Alliance do_not_reply@njtheatrealliance.org",
    to: email,
    subject,
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email sending error", error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

const sendEmail = (email, subject, name, link) => {
  const emailHtml = verificationEmail(name, link);
  const SMTP = {
    auth: smtp.auth,
    from: smtp.from,
    host: smtp.host,
    port: smtp.port,
    secure: true,
  };
  const transporter = nodemailer.createTransport(SMTP);

  const mailOptions = {
    from: smtp.from,
    to: email,
    subject,
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email sending error", error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { sendEmail, sendSubmissionEmail };
