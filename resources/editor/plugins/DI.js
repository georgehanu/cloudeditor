const React = require("react");
const { activePageSelector } = require("../../editor/stores/selectors/project");
const { pipe, filter, map, values } = require("ramda");
const assign = require("object-assign");
const FitTextDiv = require("./DI/components/FitTextDiv");
const { connect } = require("react-redux");

const di = props => {
  const objects = props.activePage.objects;
  const elements = pipe(
    filter(object => object.type == "textflow"),
    map(object => {
      const {
        top,
        text,
        left,
        fontFamily,
        fontSize,
        width,
        height,
        lineHeight,
        wordSpacing,
        letterSpacing,
        type
      } = object;
      return <FitTextDiv debug={true} {...object} key={"fit_" + object.id} />;
    }),
    values
  )(objects);
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
  console.log("elements fit", elements);
  return elements;
};
const mapStateToProps = state => {
  return { activePage: activePageSelector(state) };
};
const DiPlugin = connect(
  mapStateToProps,
  null
)(di);

module.exports = {
  DI: assign(DiPlugin, {})
};
