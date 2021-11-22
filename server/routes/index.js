const express = require("express");
const router = express.Router();
const { ensureAuthenticated, checkLogedIn } = require("../config/auth");

const { fileUploader, uploadToS3, fileRemove, removeFromS3 } = require("../utils");

//Submission Model

//User Model
const User = require("../models/User");
const { get } = require("lodash");

//Welcome Page
router.get("/", checkLogedIn, (req, res) => res.render("user/login.ejs"));

//Get View Submissions
router.get("/view/submissions", function (req, res) {
  res.render("submissions.ejs");
});

//Register Page
router.get("/register", (req, res) => res.render("user/register.ejs"));

// Get Sending Email Page
router.get("/email", function (req, res) {
  res.render("sendEmail.ejs", {
    email: "",
    name: "",
    organizationID: "",
    link: "http://localhost:8000/signup",
  });
});

// POST send email to organization
router.post("/send/email", function (req, res) {
  res.render("EmailSentStatus.ejs");
});

//
//User
router.get("/user", ensureAuthenticated, (req, res) =>
  res.render("user.ejs", { user: req.user }),
);

//Submit Form
router.get("/submit", (req, res) => res.render("submit.ejs"));

// forgot password
router.get("/forgot", function (req, res) {
  res.render("forgot.ejs");
});

//Reset password
router.get("/reset/:token", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("reset.ejs", { token: req.params.token });
    },
  );
});

// media upload route
router.post(
  "/media/upload",
  fileUploader("file", "uploads"),
  uploadToS3,
  function (req, res) {
    if (!req.validationError) {
      res.json({
        data: req.body.file, //req.file.path.replace("public/", ""),
        files: "asdf", //req.files,
      });
    } else {
      res.json({ error: "some thing went wrong" });
    }
  },
);

// router.post(
//   "/media/remove",
//   async function (req, res) {
//     try {
//       // let resp = await fileRemove("file", "uploads")
//       let respS3 = await removeFromS3(req.body.fileUrl)
//       console.log('resp: ', respS3);
//       res.json({ error: get(respS3, `[0].Messsage`, '') });
//     } catch (error) {
//       console.log('error: ', error);
//       res.json({ error: "some thing went wrong" });
      
//     }
//   },
// );

module.exports = router;
