function checkArrayInArray(array1 = [], array2 = []) {
  let isOk = true;

  for (let i = 0; i < array2.length; i++) {
    if (!array1.includes(array2[i])) {
      isOk = false;
    }
  }

  return isOk;
}

module.exports = { checkArrayInArray };
