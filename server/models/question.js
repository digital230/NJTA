const mongoose = require("mongoose");
// const subQuestionSchema = new mongoose.Schema({
//   no: Number,
//   question: String,
//   qtype: String,
//   subQuestions: [subQuestionSchema],
// });
const questionair = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: "section" },
  question: { type: String, required: true },
  options: [String],
  doption: { type: String },
  no: Number,
  optional: {
    type: Boolean,
    required: true,
    default: false
  },
  qtype: {
    type: String,
    required: true,
    default: "checkbox",
  },
  subQuestions: [this],
});

questionair.pre("find", (next) => {
  this.ans = [];
  next();
});

module.exports = mongoose.model("question", questionair);

/**
 * submission:
 * questionid, no, type,
 */
