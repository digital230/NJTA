const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
var engine = require("consolidate");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const bodyParser = require("body-parser");
const { generatePdf } = require("./utils");

const { generateHtmlTemplate } = require("./utils");
//Import Env Variables
require("dotenv").config();
let _section = {};

console.log("-------- questions ----------");
// console.log(questions);
console.log(_section);
console.log("-------- questions ----------");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// generateHtmlTemplate();

const spacesEndpoint = new aws.Endpoint("ewr1.vultrobjects.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

//Change bucket property to your Space name
//Passport config
require("./config/passport")(passport);

//DB Config
// const db = process.env.MONGO_URI;
// const db = "mongodb://localhost:27017/njta";
const db =
  "mongodb+srv://test-user:njta123@production.5cznr.mongodb.net/NJTA?retryWrites=true&w=majority";

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
app.set("views", __dirname + "/views");
app.engine("html", engine.mustache);
app.set("view engine", "ejs", "html");

//Serve CSS/Static Files
app.use(express.static(__dirname + "/src/"));
app.use(express.static(__dirname + "/public"));

//Bodyparser
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/orgRoutes"));
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/submissions", require("./routes/submissions"));

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
