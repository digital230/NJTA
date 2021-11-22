const htmlPdf = require("html-pdf");

function generatePdf(template) {
  return new Promise((resolve, reject) => {
    var config = {
      phantomPath:
        process.cwd() + "/node_modules/phantomjs-prebuilt/bin/phantomjs",
      format: "legal",
      header: {
        height: "7mm",
      },
      footer: {
        height: "12mm",
      },
    };

    // or format: 'letter' - see https://github.com/marcbachmann/node-html-pdf#options
    // Create the PDF
    htmlPdf
      .create(template, config)
      .toFile("generated.pdf", function (err, res) {
        if (err) {
          console.log("asdsadsa", err);
          return reject(err);
        }
        console.log(res);
        return resolve(res.filename);
      });
  });
}

module.exports = { generatePdf };
