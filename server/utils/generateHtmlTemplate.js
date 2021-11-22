const hb = require("handlebars");
const moment = require('moment');

hb.registerHelper("ifCond", function (val) {
  return val.includes("https://cultural-access-network.s3.us-east-2.amazonaws.com");
});

hb.registerHelper("ifTypeTwo", function (val) {
  return val && val == 2;
});
hb.registerHelper("hasText", function (val) {
  return val && val.length > 0;
});

hb.registerHelper("attr", function (name, data) {
  if (typeof target === "undefined") target = "";

  var result = " " + name + '="' + data + '" ';

  return new hb.SafeString(result);
});

hb.registerHelper("link", function (my_link) {
  var url = hb.escapeExpression(my_link);
  var result = "<a href='" + url + "'>Attachment</a>";
  console.log(result);

  return new hb.SafeString(result);
});

hb.registerHelper("inc", function (val) {
  return Number(val) + 1;
});

hb.registerHelper('formatTime', function (date, format) {
  var mmnt = moment(date);
  return mmnt.format(format);
});

const fs = require("fs");
const htmlpdf = require("html-pdf");
const { generatePdf } = require("./createPdf");
async function getTemplate() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      process.cwd() +
      "/server/utils/email-templates/finalReviewPdfTemplate.htm",
      "utf8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
}

const sections = [
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
  {
    title: "section one title",
    questionair: [
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
      {
        question: "question one",
        ans: ["option one", "option two", "option three"],
      },
    ],
  },
];

async function generateHtmlTemplate(submissions = []) {
  try {
    let data = await getTemplate();
    //   console.log("res");
    let template = hb.compile(data, {
      sections: sections,
    });
    //   console.log(template);
    const result = template(
      { sections: submissions },
      {
        // runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        // },
      },
    );
    return Promise.resolve(result); //generatePdf(result);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = { generateHtmlTemplate };
