function reorder(questions, _sections) {
  let sections = [];
  _sections.forEach((sec) => {
    let _questions = [];
    questions.forEach((question) => {
      if (question.section.equals(sec._id)) {
        _questions.push(question);
      }
    });
    sections.push({ ...sec, questions: _questions });
  });
  return sections;
}

module.exports = { reorder };
