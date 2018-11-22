const React = require("react");
const assign = require("object-assign");

const di = props => {
  const isFit = value => {
    return value <= 51;
  };

  let iterations = 0;

  const checkIterations = () => {
    return iterations < 500;
  };

  const process = (min, max) => {
    if (max - min <= 1) return min;
    let low = min;
    let high = max;
    let mid = max;
    let tmp = max;
    while (!isFit(mid) && checkIterations()) {
      mid = parseInt((low + high) / 2, 10);
      tmp = high;
      high = mid;
      iterations++;
    }
    console.log("mid", mid, tmp, iterations);
    return process(mid, tmp);
  };
  console.log("process", process(0, 100), iterations);

  return null;
};

module.exports = {
  DI: assign(di, {})
};
