const { findIndex } = require("./findIndex");
const { fileUploader, fileRemove } = require("./fileUploader");
const { checkArrayInArray } = require("./checkArrayInArray");
const { findStatus, checkAllAnsers } = require("./findStatus");
const { findAnswers, findAnswers2 } = require("./findAnswer");
const { uploadToS3, removeFromS3 } = require("./uploads3");
const { sendEmail, sendSubmissionEmail } = require("./sendEmail");
const { generatePdf } = require("./createPdf");
const { generateHtmlTemplate } = require("./generateHtmlTemplate");
const { reorder } = require("./reorder");
const {
  checkSubmissionStatusAndUpdate,
} = require("./createAndUploadPdfSubmission");
module.exports = {
  reorder,
  findAnswers2,
  checkSubmissionStatusAndUpdate,
  findIndex,
  fileUploader,
  checkArrayInArray,
  findStatus,
  findAnswers,
  uploadToS3,
  sendEmail,
  generatePdf,
  generateHtmlTemplate,
  sendSubmissionEmail,
  checkAllAnsers,
  fileRemove,
  removeFromS3
};
