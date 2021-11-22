const fs = require("fs");
const AWS = require("aws-sdk");
let awsconfig = require(process.cwd() + "/server/config/s3.json");
// console.log(awsconfig);
AWS.config.loadFromPath(process.cwd() + "/server/config/s3.json");

function uploadFile(file, filename = "abdsasdfsd.pdf", contentType) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function (err, data) {
      if (err) {
        reject(err);
      } else {
        var s3bucket = new AWS.S3({ params: { Bucket: "cultural-access-network" } });
        s3bucket.createBucket(function () {
          var params = {
            Key: `${new Date().toISOString()}~${filename}`, //file.name doesn't exist as a property
            Body: data,
            // ContentType: "application/pdf",
          };
          s3bucket.upload(params, function (err, data) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log(data);
              // console.log(data.contentType);
              resolve(data.Location);
            }
          });
        });
      }
    });
  });
}

function uploadToS3(req, res, next) {
  console.log(" --- file test ---");
  console.log(req.file);
  console.log(" --- file test ---");

  uploadFile(req.file.path, req.file.originalname, req.file.mimetype)
    .then((data) => {
      console.log("=========");
      console.log(data);
      console.log("=========");
      req.body.file = data;
      next();
    })
    .catch((Err) => {
      return res.status(500).json({ message: Err.message });
    });
}

function removeFromS3(filename) {
  console.log(" --- file test ---");
  console.log(filename);
  console.log(" --- file test ---");
  return new Promise((resolve, reject) => {
    var s3bucket = new AWS.S3({ params: { Bucket: "cultural-access-network" } });
    s3bucket.createBucket(function () {
      let file = decodeURIComponent(filename).split('/').pop()
      s3bucket.deleteObjects({ Bucket: "cultural-access-network", Delete: { Objects: [{ Key: file }] } }, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('data', data);
          resolve(data);
        }
      });
    });
  })
}

module.exports = { uploadToS3, actualUploadToS3: uploadFile, removeFromS3 };
