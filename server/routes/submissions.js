const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const multer = require("multer");
const path = require("path");

//Submission & User Model
const { Submission } = require("../models/Submission");
const User = require("../models/User");

//Show Submission
router.get("/show/:id", ensureAuthenticated, function (req, res) {
  User.findOne({
    "submission._id": req.params.id,
  })
    .select({ submission: { $elemMatch: { _id: req.params.id } } })
    .then(function (err, submission) {
      if (err) {
        console.log(err);
      } else {
        res.render("show", { submission: submission });
      }
    });
});

//Get Submission For Edit
router.get("/edit/:id", ensureAuthenticated, function (req, res) {
  console.log(req.params.id);
  User.findById(
    {
      submission: {
        $elemMatch: { _id: req.params._id },
      },
    },
    function (err, submission) {
      if (err) {
        console.log(err);
      } else {
        res.render("edit", { submission: submission });
      }
    },
  );
});

//Delete Submission
router.get("/delete/:id", (req, res) => {
  Film.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      req.flash("success_msg", "Film Deleted Successfully!");
      res.redirect("/index.ejs");
    } else {
      console.log("Error in deletetion of film :" + err);
      req.flash("success_msg", "Film Deleted Successfully!");
      res.redirect("/index.ejs");
    }
  });
});

//Submit Handle
router.post("/submit", (req, res) => {
  if (req.body._id == null) insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm + "/" + dd + "/" + yyyy;

  let submission = new Submission();

  submission.q1 = req.body.q1;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { submission: submission } },
    { new: true },
    (err, doc) => {
      req.flash("success_msg", "ADA Plan Updated Successfully");
      if (!err) {
        res.redirect("/dashboard");
      } else {
        if (err.name == "ValidationError") {
          console.log("Error during record update : " + err);
          req.flash(
            "error_msg",
            "Something went wrong! ADA Plan could not be updated.",
          );
          res.redirect("/dashboard");
        }
      }
    },
  );
}

function updateRecord(req, res) {
  User.findOneAndUpdate(
    {
      submission: {
        $elemMatch: { _id: req.body._id },
      },
    },
    req.body,
    { new: true },
    (err, doc) => {
      req.flash("success_msg", "ADA Plan Updated Successfully");
      if (!err) {
        res.redirect("/dashboard");
      } else {
        if (err.name == "ValidationError") {
          console.log("Error during record update : " + err);
          req.flash(
            "error_msg",
            "Something went wrong! ADA Plan could not be updated.",
          );
          res.redirect("edit" + req.params.id);
        }
      }
    },
  );
}

module.exports = router;
