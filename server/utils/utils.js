exports.isInArray = (array, value) => {
  return !!array.find((item) => {
    return item.getTime() == value.getTime();
  });
};
