const React = require("react");

class SnapLines extends React.PureComponent {
  render() {
    const { width, height, top, left } = this.props;
    const style = {
      width: width,
      height: height,
      top: top,
      left: left
    };
    return <div className="test" style={style} />;
  }
}

module.exports = SnapLines;
