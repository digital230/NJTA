function findAnswers2(sectionID, qID, submissions) {
  let __submissions = submissions.filter(
    (sub) => sub.section + "" === sectionID,
  );

  if (__submissions.length == 0) {
    return [];
  }

  if (__submissions.length > 0) {
    __submissions = __submissions[0];
  }

  var ans = [];
  if (__submissions != null) {
    for (let i = 0; i < __submissions.questionair.length; i++) {
      if (__submissions.questionair[i].question && __submissions.questionair[i].question._id + "" == qID) {
        ans = __submissions.questionair[i].ans;
        break;
      }
    }
  }

  return ans;
}

function findAnswers(sectionID, qID, submissions) {
  let __submissions = submissions.filter(
    (sub) => sub.section === sectionID || sub.section.equals(sectionID),
  );

  if (__submissions.length == 0) {
    return [];
  }

  if (__submissions.length > 0) {
    __submissions = __submissions[0];
  }

  var ans = [];
  if (__submissions != null) {
    for (let i = 0; i < __submissions.questionair.length; i++) {
      if (
        __submissions.questionair[i].question &&
        (__submissions.questionair[i].question._id.equals(qID) ||
        __submissions.questionair[i].question._id == qID)
      ) {
        ans = __submissions.questionair[i].ans;
        break;
      }
    }
  }

  return ans;
}

module.exports = { findAnswers, findAnswers2 };
