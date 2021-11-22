function findIndex(sections, id, go = false, start = false) {
  console.log(id);
  let isGo = go ? true : false;
  let index = -1;
  let nextIndex = -1;
  let prevIndex = -1;

  for (let i = 0; i < sections.length; i++) {
    if (sections[i]._id == id) {
      if (i < sections.length) {
        index = i;
        break;
      }
    }
  }

  if (start) {
    return {
      index,
      nextIndex: index < sections.length - 1 ? index + 1 : -1,
      prevIndex: index - 1,
    };
  }

  if (isGo) {
    index -= 1;
    nextIndex = index + 1;
    prevIndex = index - 1;
  } else {
    index += 1;
    nextIndex = index + 1;
    prevIndex = index - 1;
  }

  return {
    index: index >= 0 && index < sections.length ? index : -1,
    nextIndex: nextIndex < sections.length ? nextIndex : -1,
    prevIndex: prevIndex >= 0 ? prevIndex : -1,
  };
}

module.exports = {
  findIndex,
};
