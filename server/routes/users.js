const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { sendEmail } = require("../utils");
const { baseurl } = require("../enums");

//Used for Password Reset
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

//Import Env Variables
require("dotenv").config();

//User Model
const User = require("../models/User");

//Login Page
router.get("/login", (req, res) => res.render("user/login"));

//Register Page
router.get("/register", (req, res) => res.render("user/register"));

//Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2, code, contactName } = req.body;
  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2 || !contactName) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (password == password.toLowerCase()){
    errors.push({ msg: "Password should contain at least 1 uppercase character" });
  }

  function isValid(str){
    return !/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
   }

  if (isValid(password)){
    errors.push({ msg: "Password should contain at least 1 special character" });
  }
  if (errors.length > 0) {
    res.render("user/register", {
      errors,
      name,
      email,
      code,
      contactName,
      password,
      password2,
    });
  } else {
    //Validation Passed
    User.findOne({ code: code }).then((user) => {
      if (!user) {
        //User Exists
        errors.push({ msg: "Provided Organization ID Is Invalid" });
        res.render("user/register", {
          errors,
          name,
          email,
          code,
          contactName,
          password,
          password2,
        });
      } else if (user.password) {
        //Check if code has been registered
        errors.push({ msg: "Organization ID Has Already Been Registered" });
        res.render("user/register", {
          errors,
          name,
          email,
          code,
          contactName,
          password,
          password2,
        });
      } else {
        //Code Exists, make new user
        const newUser = new User({
          name,
          email,
          password,
          contactName,
        });
        user.name = name;
        user.email = email;
        user.contact = contactName;

        const hashString = bcrypt.hashSync(user.email, 10);
        user.hashString = hashString;
        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (err) throw err;
            //Set password to hashed
            user.password = hash;
            //Save user
            user
              .save()
              .then((_user) => {
                // sendEmail(
                //   email,
                //   "Verify Email",
                //   name,
                //   baseurl + "/users/verify/email?hash=" + hashString,
                // );
                req.flash(
                  "success_msg",
                  "You are now registered and can log in",
                );
                res.redirect("/");
              })
              .catch((err) => console.log(err));
          }),
        );
      }
    });
  }
});

/* THIS CODE WILL BE USED LATER
//Find Access Code in DB
User.findOne({ code: code })
    .then(user => {
        //If user = false, throw error
        if (!user) {
            errors.push({ msg: 'Code is not valid' });
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2,
                code
            });

        }
*/

//Login Handle
router.post("/login", (req, res, next) => {
  const { code } = req.body;
  if (code.includes("CAN") || code.includes("CANEVAL")) {
    passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  }
});

//Forgot Password
router.post("/forgot", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash("error", "No account with email address found");
            return res.redirect("/forgot");
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        // console.log(`Username ==> ${process.env.MAIL_USER}`)
        // console.log(`Password ==> ${process.env.MAIL_PASSWORD}`)

        var smtpTransport = nodemailer.createTransport({
          service: "Mailjet",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        });
        var mailOptions = {
          to: user.email,
          from: "New Jersey Theatre Alliance <do_not_reply@njtheatrealliance.org>",
          subject: "Password Reset - ADA Plan Submission",
          text:
            "You are receiving this because you (or someone else in your organization) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log("mail sent");
          req.flash(
            "success_msg",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions.",
          );
          done(err, "done");
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/forgot");
    },
  );
});

router.post("/reset/:token", function (req, res) {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired.",
              );
              return res.redirect("back");
            }

            function hasLowerCase(str) {
              return str.toUpperCase() != str;
            }

            function hasUpperCase(str) {
              return str.toLowerCase() != str;
            }

            function hasNumber(str) {
              return /\d/.test(str);
            }

            if (!hasLowerCase(req.body.password)) {
              req.flash(
                "error",
                "Password must contain at least 1 lowercase letter",
              );
              return res.redirect("back");
            }

            if (!hasUpperCase(req.body.password)) {
              req.flash(
                "error",
                "Password must contain at least 1 uppercase letter",
              );
              return res.redirect("back");
            }

            // if (!hasNumber(req.body.password)) {
            //   req.flash("error", "Password must contain at least 1 number");
            //   return res.redirect("back");
            // }

            function specChar(str) {
              return !/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
            }

            //Check pass special character
            if (specChar(req.body.password)) {
              req.flash(
                "error",
                "Password must contain at least 1 special character",
              );
              return res.redirect("back");
            }

            if (req.body.password === req.body.confirm) {
              user.password = req.body.password;
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(user.password, salt, (error, hash) => {
                  if (err) throw err;
                  //Set password to hashed
                  user.password = hash;
                  //Save user
                  user.save(function (err) {
                    done(err, user);
                  });
                }),
              );
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          },
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Mailjet",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        });
        var mailOptions = {
          to: user.email,
          from: "New Jersey Theatre Alliance <do_not_reply@njtheatrealliance.org>",
          subject: "Successful Password Reset - ADA Plan Submission",
          text:
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          req.flash("success_msg", "Success! Your password has been changed.");
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect("/");
    },
  );
});

router.post("/updateProfile", (req, res) => {
  if (req.user.email != req.body.email) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        //handle error here
      }

      //if a user was found, that means the user's email matches the entered email
      if (user) {
        req.flash("error_msg", "Email address is already in use");
        res.redirect("/user.ejs");
      } else {
        User.findOneAndUpdate(
          { _id: req.body._id },
          { name: req.body.name, email: req.body.email },
          { new: true },
          (err, user) => {
            console.log(user);
          },
        );

        req.flash("success_msg", "Success! Profile has been updated");
        res.redirect("/user.ejs");
      }
    });
  } else if (
    req.user.company != req.body.company ||
    req.user.lastName != req.body.lastName ||
    req.user.name != req.body.name
  ) {
    User.findOneAndUpdate(
      { _id: req.body._id },
      {
        company: req.body.company,
        lastName: req.body.lastName,
        name: req.body.name,
      },
      { new: true },
      (err, user) => {
        console.log(user);
        req.flash("success_msg", "Success! Company has been updated");
        res.redirect("/user.ejs");
      },
    );
  }
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

router.get("/verify/email", (req, res) => {
  let hashString = req.query.hash;
  User.findOne({ hashString: req.query.hash }).then((user) => {
    if (user) {
      req.flash(
        "success_msg",
        "Your Email Verified Successfully, you can login.",
      );
      res.redirect("/users/login");
    } else {
      res.render("error.ejs", { error: "Your Email Verification FAiled." });
    }
  });
});
module.exports = router;
