const mongoose = require("mongoose");
//Here will go all of the questions for the form
const sectionSchema = new mongoose.Schema({
  no: {
    type: Number,
    default: 1,
  },
  subplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "submissionplan",
  },
  title: {
    type: String,
  },
});

sectionSchema.virtual("questions", {
  ref: "question",
  localField: "_id",
  foreignField: "section",
});

sectionSchema.set("toObject", { virtuals: true });

sectionSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("section", sectionSchema);
