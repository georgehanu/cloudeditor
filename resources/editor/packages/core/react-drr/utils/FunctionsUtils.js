const findInArray = (array, callback) => {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
};

module.exports = {
  findInArray
};
