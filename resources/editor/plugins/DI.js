const React = require("react");
const { activePageSelector } = require("../../editor/stores/selectors/project");
const { pipe, filter, map, values } = require("ramda");
const assign = require("object-assign");
const FitTextDiv = require("./DI/components/FitTextDiv");
const { connect } = require("react-redux");
const { updateObjectProps } = require("../stores/actions/project");

const di = props => {
  const objects = props.activePage.objects;

  const process = (min, max, isFit, applyFnc, iterations) => {
    if (iterations >= 100) return -1;
    if (max - min <= 1) return min;
    let low = min;
    let high = max;
    let mid = max;
    let tmp = max;
    applyFnc(mid);
    while (isFit(mid)) {
      mid = parseInt((low + high) / 2, 10);
      tmp = high;
      high = mid;
      iterations++;
      applyFnc(mid);
    }
    console.log("mid", mid, tmp, iterations);
    return process(mid, tmp, isFit, applyFnc, iterations);
  };

  const elements = pipe(
    filter(object => object.type == "textflow"),
    map(object => {
      return (
        <FitTextDiv
          process={process}
          onUpdateProps={props.onUpdatePropsHandler}
          debug={true}
          {...object}
          key={object.id}
        />
      );
    }),
    values
  )(objects);
  return elements;
};
const mapStateToProps = state => {
  return { activePage: activePageSelector(state) };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePropsHandler: payload => dispatch(updateObjectProps(payload))
  };
};

const DiPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(di);

module.exports = {
  DI: assign(DiPlugin, {}),
  epics: require("./DI/store/epics")
};
