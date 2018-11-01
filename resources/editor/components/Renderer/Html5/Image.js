const React = require("react");
const randomColor = require("randomcolor");

class ImageBlock extends React.PureComponent {
  render() {
    const { key, width, height, top, left, ...otherProps } = this.props;
    const style = {
      width: width,
      height: height,
      left: left,
      top: top,
      backgroundColor: randomColor()
    };
    return (
      <div className={this.props.type} style={style}>
        image block
      </div>
    );
  }
}

module.exports = ImageBlock;
