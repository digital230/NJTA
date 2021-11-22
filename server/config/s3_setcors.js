var AWS = require('aws-sdk');

AWS.config.update({ endpoint: 'ewr1.vultrobjects.com' });
AWS.config.update({region: 'ewr1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create initial parameters JSON for putBucketCors
var thisConfig = {
  AllowedHeaders:["*"],
  AllowedMethods:["*"],
  AllowedOrigins:["*"],
  ExposeHeaders:[],
  MaxAgeSeconds:10000
};

// Assemble the list of allowed methods based on command line parameters
var allowedMethods = [];
process.argv.forEach(function (val, index, array) {
  if (val.toUpperCase() === "POST") {allowedMethods.push("POST")};
  if (val.toUpperCase() === "GET") {allowedMethods.push("GET")};
  if (val.toUpperCase() === "PUT") {allowedMethods.push("PUT")};
  if (val.toUpperCase() === "PATCH") {allowedMethods.push("PATCH")};
  if (val.toUpperCase() === "DELETE") {allowedMethods.push("DELETE")};
  if (val.toUpperCase() === "HEAD") {allowedMethods.push("HEAD")};
});

// Copy the array of allowed methods into the config object
thisConfig.AllowedMethods = allowedMethods;
// Create array of configs then add the config object to it
var corsRules = new Array(thisConfig);

// Create CORS params
var corsParams = {Bucket: process.argv[2], CORSConfiguration: {CORSRules: corsRules}};

// set the new CORS configuration on the selected bucket
s3.putBucketCors(corsParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    // update the displayed CORS config for the selected bucket
    console.log("Success", data);
  }
});
