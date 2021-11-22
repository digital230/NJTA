const mongoose = require("mongoose");
const { SubmissionSchema } = require("./Submission");

const submissionSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  submitted: {
    type : Boolean,
    default : false
  },
  subplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "submissionplan",
  },
  pdfLink: {
    type: String,
  },
  submissionDate: {
    type: Date,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  submission: [submissionSchema],
  hashString: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
