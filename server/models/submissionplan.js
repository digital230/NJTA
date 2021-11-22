const mongoose = require("mongoose");
const subplan = new mongoose.Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date },
    reSubmissionDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

subplan.virtual("sections", {
  ref: "section",
  localField: "_id",
  foreignField: "subplan",
});

subplan.set("toObject", { virtuals: true });
subplan.set("toJSON", { virtuals: true });

module.exports = mongoose.model("submissionplan", subplan);
