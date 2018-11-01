const React = require("react");
const ObjectBlock = require("./Object");

const objects = props => (
  <React.Fragment>
    {Object.keys(props.items).map(obKey => {
      const { width, height, left, top, ...otherProps } = props.items[obKey];
      const scale = props.scale;
      return (
        <ObjectBlock
          key={obKey}
          width={width * scale}
          height={height * scale}
          left={left * scale}
          top={top * scale}
          {...otherProps}
          onDrag={props.onDrag}
        />
      );
    })}
  </React.Fragment>
);

module.exports = objects;
