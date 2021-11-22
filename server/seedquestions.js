const mongoose = require("mongoose");
const Question = require("./models/question");
const Plan = require("./models/submissionplan");
const Section = require("./models/section");
let seedQuestions = require("./seed/questions-seeds.json");
const seedSections = require("./seed/section-seeds");
const seedplans = require("./seed/plan-seed.json");
require("dotenv").config();
// const db = process.env.MONGO_URI;
// const db = "mongodb://localhost:27017/njta";
const db =
  "mongodb+srv://test-user:njta123@production.5cznr.mongodb.net/NJTA?retryWrites=true&w=majority";

console.log(process.env.MONGO_URI);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected...");
    seed();
  })
  .catch((err) => console.log(err));

async function seedPlan() {
  try {
    await Plan.remove({});
    await Plan.create(seedplans);
  } catch (error) {
    console.log(error);
  }
}

async function seedQuests() {
  try {
    await Question.remove({});
    console.log("------ removed older questions ----------------");
    seedQuestions = seedQuestions.map((sq) => {
      if (
        ["13", "25", "26", "29", "31", "37", "94", "95", "96"].includes(
          `${sq.no}`
        )
      ) {
        sq = { ...sq, optional: true };
      }
      return sq;
    });
    await Question.create(seedQuestions);
    console.log("------ added newer questions ----------------");
  } catch (error) {
    console.log(error);
  }
}

async function seedSection() {
  try {
    await Section.remove({});
    console.log("------ removed older sections ----------------");
    await Section.create(seedSections);
    console.log("------ added newer sections ----------------");
  } catch (error) {
    console.log(error);
  }
}

async function seed() {
  try {
    await seedPlan();
    await seedSection();
    await seedQuests();
  } catch (error) {
    console.log(error);
  }
}
