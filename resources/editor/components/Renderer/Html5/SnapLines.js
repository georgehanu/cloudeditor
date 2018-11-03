const React = require("react");

const lines = props => (
  <React.Fragment>
    {Object.keys(props.lines).map(obKey => {
      const { width, height, left, top } = props.lines[obKey];
      const scale = props.scale;
      return <div style={style} className="drag_alignLines" />;
    })}
  </React.Fragment>
);
