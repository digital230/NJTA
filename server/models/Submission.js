const mongoose = require("mongoose");

const ansSchema = new mongoose.Schema({
  type: {
    type: Number,
    default: 1, // 1: primary, 2: secondary [after added needimprovement status]
  },
  text: String,
  value: String,
  no: Number,
});
//Here will go all of the questions for the form
const SubmissionSchema = new mongoose.Schema({
  subplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "submissionplan",
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
  },
  questionair: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
      ans: [ansSchema],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    default: "inprogress",
    enum: [
      "completed",
      "inprogress",
      "approved",
      "rejected",
      "needImprovement",
      "sumitted",
    ],
  },
});

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = {
  Submission,
  SubmissionSchema: SubmissionSchema,
};
