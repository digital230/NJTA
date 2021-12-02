const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const SubPlan = require("../models/submissionplan");
const Section = require("../models/section");
const Submission = require("../models/Submission").Submission;
const User = require("../models/User");
const { ensureAuthenticated, checkLogedIn } = require("../config/auth");

const {
  reorder,
  findIndex,
  findAnswers,
  findStatus,
  checkSubmissionStatusAndUpdate,
  sendSubmissionEmail,
  generateHtmlTemplate,
  generatePdf,
  checkAllAnsers,
} = require("../utils");
const { actualUploadToS3 } = require("../utils/uploads3");
const _ = require("lodash");
const fs = require("fs");
const { findAnswers2 } = require("../utils/findAnswer");

//Get Dashboard for organization
router.get("/dashboard", ensureAuthenticated, async function (req, res) {
  let plans = await SubPlan.find({}).populate("sections").lean(true);
  let planIDs = plans.map((p) => p._id);
  let user = await User.findOne({ _id: req.user._id });
  let __plans = await Promise.all(
    _.map(plans, async (plan) => {
      let completedCount = await Submission.countDocuments({
        subplan: plan._id,
        status: "completed",
        user: req.user._id,
      });
      console.log("completedCount: ", completedCount);

      // check in user submission for this plan, if exist pick status, otherwise calculate from count
      let pus = user.submission.filter(
        (sub) => sub.subplan.equals(plan._id) || sub.subplan == plan._id
      );
      console.log("pus: ", pus);
      (plan.status =
        pus.length > 0
          ? pus[0].status
          : completedCount === 0
          ? "incomplete"
          : completedCount === plan.sections.length
          ? "completed"
          : "inprogress"),
        (plan.pdfLink = null);
      // let filteredPlan = user.submission.filter((sub) => sub.plan === plan._id);
      plan.pdfLink = pus.length > 0 ? pus[0].pdfLink : null; // filteredPlan.length > 0 ? filteredPlan[0].pdfLink : null;
      return plan;
    })
  );

  console.log(req.user.submission);

  let tempSub = [
    {
      submitted: false,
    },
  ];

  if (req.user.submission.length === 0) {
    res.render("index.ejs", {
      plans: __plans,
      submission: tempSub,
      name: req.user.name,
      email: req.user.email,
      code: req.user.code,
      id: req.user._id,
    });
  } else {
    res.render("index.ejs", {
      plans: __plans,
      submission: req.user.submission,
      name: req.user.name,
      email: req.user.email,
      code: req.user.code,
      id: req.user._id,
    });
  }
});

// Get Take Survey
router.get(
  "/take/survey/:planID",
  ensureAuthenticated,
  checkStatusForSubmission,
  async function (req, res) {
    try {
      let subMissions = await Submission.find({
        subplan: req.params.planID,
        user: req.user._id,
      })
        .populate({
          path: "questionair.question",
        })
        .lean(true);

      let statusCompleted =
        (await checkAllStatuses(req.user._id, req.params.planID)) == 11;
      let allSections = await Section.find({
        subplan: req.params.planID,
      })
        .populate([
          {
            path: "questions",
            options: {
              sort: {
                no: 1,
              },
            },
          },
        ])
        .sort({
          no: 1,
        })
        .lean(true);
      let __allSections = allSections.map((section) => {
        let questns = section.questions.map((q) => {
          let _ans = findAnswers(section._id, q._id, subMissions) || [];
          return { ...q, ans: _ans };
        });

        return {
          ...section,
          questions: questns,
          status: findStatus(
            section._id,
            subMissions,
            section.questions.length
          ),
        };
      });

      let index = { index: 0, nextIndex: 1, prevIndex: -1 };
      if (req.query.cat) {
        index = findIndex(__allSections, req.query.cat, false, true);
      }

      res.render("user/takesurvey.ejs", {
        sections: __allSections,
        selectedSection: __allSections[index.index],
        nextSection: __allSections[index.nextIndex],
        plan: __allSections[0].subplan,
        prevSectionLink:
          index.prevIndex >= 0 ? __allSections[index.prevIndex] : null,
        status: req.body.status, // true, if needImprovement
        statusCompleted,
      });
    } catch (error) {
      console.log(error);
      res.render("error.ejs", { error: error.message });
    }
  }
);

// final preview v2 (newer, preview all questions submitted as well as unsubmitted)
router.get(
  "/view/submissions/:plan/:showSubmit",
  ensureAuthenticated,
  async function (req, res) {
    try {
      const submissions = await Submission.find({
        user: req.user._id,
        subplan: req.params.plan,
      })
        .populate({
          path: "questionair.question",
        })
        .lean(true)
        .sort({ "questionair.ans.type": 1 });

      let sections = await Section.find({ subplan: req.params.plan })
        .sort({ no: 1 })
        .populate([
          {
            path: "questions",
            options: {
              sort: {
                no: 1,
              },
            },
          },
        ])
        .lean(true);
      let allQuestions = await Question.find({
        section: { $in: sections.map((sec) => sec._id) },
      })
        .sort({ no: 1 })
        .lean(true);
      sections = sections.map((section) => {
        return {
          ...section,
          status: findStatus(
            section._id,
            submissions,
            section.questions.length
          ),
        };
      });

      allQuestions = allQuestions.map((question) => {
        let ans = findAnswers2(
          question.section + "",
          question._id + "",
          submissions
        );
        return {
          ...question,
          ans: ans,
        };
      });

      let previews = reorder(allQuestions, sections);
      let statusCompleted =
        (await checkAllStatuses(req.user._id, req.params.plan)) == 11;

      return res.render("user/finalReview2.ejs", {
        sections,
        allQuestions,
        previews,
        plan: req.params.plan,
        statusCompleted,
        showSubmit: req.params.showSubmit === "true",
      });
    } catch (error) {
      console.log("-- error --");
      console.log(error);
      res.render("error", { error: error });
    }
  }
);
// user:6127939be5016a3ca54711d8, plan:61273ce742a6b319da4b524d

// final preview submission
router.post("/submit/question/draft", ensureAuthenticated, async (req, res) => {
  try {
    const { section, plan, question, ans } = req.body;
    console.log("section: ", section);
    let isEmptyAnswer = ans.filter((ans) => ans.value.length <= 0);
    // let hasFileUploaded = ans.find(f => {
    //   return f.value.split('/')[0].indexOf('http') >= 0 || f.qType == 'file'
    // });
    let emptyAnsLength = isEmptyAnswer.length;
    let ansLength = ans.length;

    // if(hasFileUploaded && ansLength > 1 && emptyAnsLength > 0) {
    //   emptyAnsLength -= 1;
    // }

    console.log("----- req body ---------");
    console.log(ans, emptyAnsLength, ansLength);
    console.log("----- req body ---------");
    const allSectionsLength = await Section.countDocuments({ subplan: plan });
    let sectionQuestion = await Section.findOne({ _id: section }).populate(
      "questions"
    );

    console.log("sectionQuestion: ", sectionQuestion.questions.length);
    console.log({
      subplan: plan,
      section: section,
      user: req.user._id,
    });

    let submission = await Submission.findOne({
      subplan: plan,
      section: section,
      user: req.user._id,
    });
    // console.log("submission: ", submission.questionair);

    // for (let q of sectionQuestion.questions) {
    //   console.log(q);
    //   let a = submission.questionair.filter(
    //     (w) => w.question == q._id || w.question.equals(q._id)
    //   );

    //   console.log("====>", a.length);
    // }

    if (submission) {
      let filteredQuestion = submission.questionair.filter(
        (q) => q.question == question || q.question.equals(question)
      );
      console.log("filteredQuestion: ", filteredQuestion);

      if (filteredQuestion.length > 0) {
        if (emptyAnsLength > 0 && emptyAnsLength == ansLength) {
          // all empty
          for (let i = 0; i < submission.questionair.length; i++) {
            if (
              submission.questionair[i].question ==
                filteredQuestion[0].question ||
              submission.questionair[i].question.equals(
                filteredQuestion[0].question
              )
            ) {
              submission.questionair.splice(i, 1);
            }
          }
          // filteredQuestion.splice(0, 1);
        } else {
          // filteredQuestion[0].ans = ans;
        }
      } else {
        if (emptyAnsLength == 0 || emptyAnsLength < ansLength) {
          submission.questionair.push({ question, ans });
        }
      }

      let OPQ = [], // optional quesion
        restQ = [],
        OSQ = [],
        restSQ = [],
        OK = [],
        restAnsOK = false;
      try {
        for (let q of sectionQuestion.questions) {
          if (q.optional) {
            OPQ.push(q);
          } else {
            restQ.push(q);
          }
        }

        for (let q of submission.questionair) {
          if (
            OPQ.find((op) => op._id == q.question || op._id.equals(q.question))
          ) {
            OSQ.push(q);
          } else {
            restSQ.push(q);
          }
        }
        // console.log("restSQ: ", restSQ);
        console.log(restQ.length, restSQ.length);

        if (restQ.length == restSQ.length) {
          restAnsOK =
            !restSQ.filter((rq) => {
              // console.log("rq.ans: ", rq.ans);
              rq.ans.find((a) => a.value.length == 0);
            }).length > 0;
        }

        // console.log("OSQ: ", OSQ, OPQ);

        if (OSQ.length == OPQ.length) {
          for (let sq of OSQ) {
            if (sq.ans.length > 1) {
              let ok =
                sq.ans.filter((ans) => ans.value.length <= 0).length !=
                sq.ans.length;
              OK.push(ok);
            }

            if (sq.ans.length == 1) {
              let ok = (sq.ans.filter((ans) => ans.value.length <= 0).length =
                sq.ans.length);
              OK.push(ok);
            }
          }
        } else {
          for (let sq of OSQ) {
            if (sq.ans.length > 1) {
              let ok =
                sq.ans.filter((ans) => ans.value.length <= 0).length !=
                sq.ans.length;
              OK.push(ok);
            }

            if (sq.ans.length == 1) {
              let ok = (sq.ans.filter((ans) => ans.value.length <= 0).length =
                sq.ans.length);
              OK.push(ok);
            }
          }

          OPQ.map((o) => {
            let inOSQ = OSQ.find(
              (osq) => osq.question == o._id || o._id.equals(osq.question)
            );
            // console.log('inOSQ: ', inOSQ);
            if (o.subQuestions.length == 0 && !inOSQ) {
              OK.push(o);
            }
          });
        }
      } catch (error) {
        console.log("error: ", error);
      }

      console.log(OK.length, OPQ.length, restAnsOK);

      if (OK.length == OPQ.length && restAnsOK) {
        // status = 'completed'
        submission.status = "completed";
      } else {
        // status = 'inprogress';
        submission.status = "inprogress";
      }

      // console.log("submission: ", submission);

      // console.log('submission.questionair.length: ', submission.questionair.length, sectionQuestion.questions.length);

      // if ((submission.questionair.length === sectionQuestion.questions.length) && emptyAnsLength == 0) {
      //   submission.status = "completed";
      // } else if(emptyAnsLength > 0 && emptyAnsLength <= ansLength) {
      //   submission.status = "inprogress";
      // } else {
      //   submission.status = "inprogress";
      //   console.log("make it inprogress ...");
      // }
      let saved;
      try {
        saved = await submission.save();
      } catch (error) {
        console.log("error: ", error);
      }
      let allCompletionStatus = await isAllsStatusCompleted(
        req.user._id,
        plan,
        allSectionsLength
      );

      if (allCompletionStatus == allSectionsLength) {
        console.log("all completed");
        checkSubmissionStatusAndUpdate(req.user._id, plan, false);
      } else if (
        allCompletionStatus > 0 &&
        allCompletionStatus != allSectionsLength
      ) {
        // check for inprogress submission
        console.log("settign inprogress in user");

        checkForInprogressAndUpdate(req.user._id, plan);
      }

      return res.json({ message: "saved draft", data: saved });
    } else {
      let sub = await Submission.create({
        user: req.user._id,
        section,
        subplan: plan,
        status:
          sectionQuestion.questions.length == 1 ? "completed" : "inprogress",

        questionair: [{ question: question, ans: ans }],
      });
      return res.json({ data: sub, message: "Saved Draft Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// share pdf on email.
router.get(
  "/share/email/:plan",
  ensureAuthenticated,
  async function (req, res) {
    // get all submissions
    // create pdf
    // send email link.
    // fetch all submissions for pdf creation
    try {
      const user = await User.findOne({ _id: req.user._id });
      const submissions = await Submission.find({
        user: req.user._id,
        subplan: req.params.plan,
      })
        .populate([
          {
            path: "section",
            select: "title",
          },
          {
            path: "questionair.question",
            select: "question",
          },
        ])
        .sort({ section: 1, "questionair.ans.no": 1 });

      const template = await generateHtmlTemplate(submissions);
      // console.log('template: ', template);
      const pdfpath = await generatePdf(template);
      const pdfLink = await actualUploadToS3(pdfpath, "submission.pdf");

      await sendSubmissionEmail(
        user.email,
        "ADA Submission PDF",
        user.name,
        pdfLink
      );

      user.submission[0].submitted = true;
      await user.save();

      res.json({
        message:
          "Your Confirmation email is being sent, it may take a few seconds.",
        status: "OK",
      });
      // res.json({ message: "Your application has been submitted successfully", status: 'OK' });
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        message: "Some thing went wrong, please try again.",
        error: error.message,
        status: "error",
      });
    }
  }
);

async function sendEmail(user, plan) {
  /**
   * @param {user, plan}
   * Fetch submissions, generate template, create pdf, upload to S3, and then send email to user.
   */
  const submissions = await Submission.find({
    user: user,
    subplan: plan,
  })
    .populate([
      {
        path: "section",
        select: "title",
      },
      {
        path: "questionair.question",
        select: "question",
      },
    ])
    .sort({ section: 1, "questionair.ans.no": 1 });

  const template = await generateHtmlTemplate(submissions);
  const pdfpath = await generatePdf(template);
  const pdfLink = await actualUploadToS3(pdfpath, "somename.pdf");

  console.log(pdfLink);

  await sendSubmissionEmail(
    "skhalid0322@gmail.com",
    "Submission Pdf",
    "shah khalid",
    pdfLink
  );
}

function isAllCompleted(allSections, subMissions = []) {
  let check = false;
  if (subMissions.length === allSections.length) {
    check = subMissions.every((itm) => itm.status == "completed");
  }
  console.log("status check : " + check);
  return check;
}

async function isAllsStatusCompleted(user, plan, len) {
  // sections.length == submissions.length && status = completed
  try {
    return await Submission.countDocuments({
      user: user,
      subplan: plan,
      status: "completed",
    });
  } catch (error) {
    console.log("--- error ---");
    console.log(error);
    console.log("--- error ---");
    return false;
  }
}

/**
 * @description  Check for needImprovement status, return to next req.body.status = true or false
 */
function checkStatusForSubmission(req, res, next) {
  const plan = req.params.planID || req.query.plan;
  User.findOne({ _id: req.user._id })
    .then((doc) => {
      let submission = doc.submission.filter(
        (sub) => sub.subplan === plan || sub.subplan.equals(plan)
      );
      if (submission.length > 0) {
        req.body.status = submission[0].status === "needImprovement";
      } else {
        req.body.status = false; // false;
      }

      next();
    })
    .catch((Err) => {
      console.log(Err);

      return res.render("error.ejs", { error: Err.message });
    });
}

async function checkForInprogressAndUpdate(userID, planID) {
  //userid, planid, status, link = null,  subMissionDate, pdfLink=null;
  try {
    let _user = await User.findOne({
      _id: userID,
      "submission.subplan": planID,
    }).lean(true);
    if (_user) {
      let submissions = _user.submission;
      let planIndex = submissions.findIndex((s) => s.subplan == planID);
      let plan = submissions[planIndex];
      if (plan) {
        plan["status"] = "inprogress";
        plan["submissionDate"] = new Date();
        plan["pdfLink"] = "null";
        submissions[planIndex] = plan;
        await User.update(
          { _id: userID },
          { $set: { submission: submissions } }
        );
      }
      return Promise.resolve("ok");
    }
    await User.findOneAndUpdate(
      { _id: userID },
      {
        $push: {
          submission: {
            subplan: planID,
            status: "inprogress",
            submissionDate: new Date(),
            pdfLink: null,
          },
        },
      },
      {
        upsert: false,
        new: true,
      }
    );
    console.log("added inprogress submission status...");
    return Promise.resolve("ok");
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

function checkAllStatuses(user, plan) {
  return Submission.countDocuments({
    user: user,
    subplan: plan,
    status: "completed",
  });
}

module.exports = router;
