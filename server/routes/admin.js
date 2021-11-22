const express = require("express");
const {
  ensureAuthenticated,
  ensureAdminAuthentication,
} = require("../config/auth");
const Submission = require("../models/Submission").Submission;
const Plan = require("../models/submissionplan");
const Section = require("../models/section");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/question");
const { findAnswers2, reorder } = require("../utils");
router.get("/dashboard", (req, res) => {
  let query = {};
  let year = req.query.year ? Number(req.query.year) : false;
  if (year) {
    query = {
      "submission.submissionDate": {
        $gt: new Date(year, 0, 0),
        $lte: new Date(year, 12, 0),
      },
    };
  }

  User.find(query)
    .populate("submission.subplan")
    .then((docs) => {
      // console.log(req.query.plan);
      let filtered = docs.filter((user) => user.submission.length > 0);
      res.render("admin/dashboard.ejs", {
        data: filtered,
        className: "dashboard",
      });
    })
    .catch((err) => res.render("error.ejs", { error: err.message }));
});

router.get("/organizations", (req, res) => {
  User.find({})
    .then((docs) => {
      res.render("admin/organizations.ejs", {
        className: "organizations",
        data: docs.filter((doc) => doc.name && doc.email),
      });
    })
    .catch((err) => res.render("error.ejs", { error: err.message }));
});

router.get("/get/organizations", (req, res) => {
  User.find({})
    .then((docs) => {
      res.json({
        data: docs.filter((doc) => doc.name && doc.email),
      });
    })
    .catch((err) => res.render("error.ejs", { error: err.message }));
});

router.get("/settings", (req, res) => {
  Plan.find({})
    .then((docs) => {
      console.log(docs);
      res.render("admin/settings.ejs", {
        dueDate: toInputDate(docs[0].dueDate),
        reSubmissionDate: toInputDate(docs[0].reSubmissionDate),
        ID: docs[0]._id,
        className: "settings",
      });
    })
    .catch((err) => res.render("error.ejs", { error: err.message }));
});

router.put("/update/status/:user/:subID", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.user, "submission._id": req.params.subID },
    { $set: { "submission.$.status": req.query.status } },
    { upsert: false, new: true },
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => res.json(err.message));
});

router.post("/update/resubmission/:ID", (req, res) => {
  const { redate } = req.body;
  Plan.findOneAndUpdate(
    { _id: req.params.ID },
    { reSubmissionDate: redate },
    { upsert: false, new: true },
  )
    .then((doc) => {
      res.json({ message: "Due date updated successfully", data: doc });
    })
    .catch((err) => res.render("error.ejs", { error: err.message }));
});

router.post("/update/duedate/:ID", (req, res) => {
  const { dueDate } = req.body;
  console.log("======= date ==========");
  console.log(dueDate);
  console.log("======= date ==========");

  Plan.update(
    { _id: req.params.ID },
    { dueDate: dueDate },
    { upsert: false, new: true },
  )
    .then((doc) => {
      res.json({ message: "Due date updated successfully", data: doc });
    })
    .catch((err) => res.render("error.ejs", { error: err.message }));
});

// final preview submission
router.get(
  "/view/submissions/:plan/:user",
  ensureAdminAuthentication,
  async (req, res) => {
    try {
      const submissions = await Submission.find({
        user: req.params.user,
        subplan: req.params.plan,
      }).lean(true);

      console.log(submissions.length, " ---- ");
      let sections = await Section.find({ subplan: req.params.plan })
        .sort({ no: 1 })
        .lean(true);
      let allQuestions = await Question.find({
        section: { $in: sections.map((sec) => sec._id) },
      })
        .sort({ no: 1 })
        .lean(true);
      sections = sections.map((section) => {
        let completed =
          submissions.filter(
            (sub) =>
              sub.section == section._id || sub.section.equals(section._id),
          ).length > 0;
        return { ...section, completed };
      });

      allQuestions = allQuestions.map((question) => {
        let ans = findAnswers2(
          question.section + "",
          question._id + "",
          submissions,
        );
        return {
          ...question,
          ans: ans,
        };
      });

      let previews = reorder(allQuestions, sections);
      return res.render("admin/adminPreview2.ejs", {
        sections,
        allQuestions,
        previews,
      });
    } catch (error) {
      console.log("-- error --");
      console.log(error);
      res.render("error", { error: error });
    }
  },
);

router.post("/update/duedate/:ID", ensureAdminAuthentication, (req, res) => {
  Plan.findOneAndUpdate(
    { _id: req.params.ID },
    { dueDate: req.body.date },
    { upsert: false, new: true },
  )
    .then((doc) => {
      res.json({ message: "due date update successfully", data: doc });
    })
    .catch((err) => {
      req.flash("error_msg", "Some Thing Went Wrong");
      res.render("error.ejs", { error: err.message });
    });
});

module.exports = router;

function toInputDate(date) {
  if (date == null || date == undefined) {
    return date;
  }
  let d = date.toLocaleString().split(",")[0].split("/");
  console.log(d[2] + "-" + d[0] + "-" + d[1]);
  return d[2] + "-" + (d[0] > 9 ? d[0] : "0" + d[0]) + "-" + d[1];
}
