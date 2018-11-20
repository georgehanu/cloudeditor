const React = require("react");
const ObjectBlock = require("./Object");

const objects = props => (
  <React.Fragment>
    {Object.keys(props.items).map(obKey => {
      let {
        width,
        height,
        left,
        top,
        offsetLeft,
        offsetTop,
        ...otherProps
      } = props.items[obKey];
      if (props.viewOnly) {
        offsetLeft = 0;
        offsetTop = 0;
      }
      const scale = props.scale;
      return (
        <ObjectBlock
          key={obKey}
          scale={scale}
          width={width * scale}
          height={height * scale}
          offsetLeft={offsetLeft}
          offsetTop={offsetTop}
          left={(left + offsetLeft) * scale}
          top={(top + offsetTop) * scale}
          viewOnly={props.viewOnly}
          {...otherProps}
          onUpdateProps={props.onUpdateProps}
        />
      );
    })}
  </React.Fragment>
);

module.exports = objects;
