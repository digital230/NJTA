const Submission = require("../models/Submission").Submission;
const User = require("../models/User");
const { generateHtmlTemplate } = require("./generateHtmlTemplate");
const { generatePdf } = require("./createPdf");
const { actualUploadToS3 } = require("./uploads3");

async function checkSubmissionStatusAndUpdate(_userID, _plan, email = false) {
  console.log("generating template & pdf and email uploading to s3...");
  // get All Submissions
  // generate html
  // create pdf
  // upload s3
  // update user

  try {
    const user = await User.findOne({ _id: _userID });
    const filteredPlan = user.submission.filter(
      (sub) => sub.subplan === _plan || sub.subplan.equals(_plan),
    );
    // not sending email or no plan matches(not already generated pdf), return
    if (
      (!email &&
        filteredPlan.length > 0 &&
        (filteredPlan[0].status == "submitted" ||
          filteredPlan[0].status == "needImprovement")) ||
      (email && filteredPlan.length == 0)
    ) {
      console.log("returning ...");
      console.log(
        !email
          ? "Already Submission Created and uploaded"
          : "There is no submission yet to send as email..",
      );
      return;
    }

    // fetch all submissions for pdf creation
    const submissions = await Submission.find({
      user: user,
      subplan: _plan,
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
      .sort({ section: 1 });

    // generate html template from submissions
    // const template = await generateHtmlTemplate(submissions);
    // const pdfpath = await generatePdf(template);

    // upload to s3
    const uploadS3Link = "uploaded link";
    // await actualUploadToS3(pdfpath);

    // if we have to share to email, just update pdf link
    // otherwise it is new submission, push to user's submissions list and update

    if (email) {
      filteredPlan[0].pdfLink = "hardcodedlink"; //uploadS3Link;
    } else {
      let filt = user.submission.filter(
        (sub) => sub.subplan == _plan || sub.subplan.equals(_plan),
      );
      if (filt.length > 0) {
        filt[0].status = "completed";
        filt[0].pdfLink = uploadS3Link;
      } else {
        user.submission.push({
          subplan: _plan,
          pdfLink: uploadS3Link,
          status: "completed",
          submissionDate: new Date(),
        });
      }
    }

    await user.save();

    // return updated user, and pdf link.
    return Promise.resolve({ user: user, pdfLink: uploadS3Link });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

module.exports = { checkSubmissionStatusAndUpdate };
/**
 *
 * if(close date expire && not status of [needimprovement, approved, rejected]) => submitted.
 * if(close date is expire && resubmission date is expired && not status of [approved, rejected]) => submitted
 *
 */
