require('dotenv').config();

module.exports = {
  smtp: {
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    from: "New Jersey Theatre Alliance do_not_reply@njtheatrealliance.org",
    host: "in-v3.mailjet.com",
    port: 465,
  },
};
