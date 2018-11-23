const React = require("react");
const randomColor = require("randomcolor");

class FitTextDiv extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }
  componentDidUpdate() {
    const result = this.returnOverflow();
    //here we need to apply the dunction from george
  }
  returnOverflow() {
    const containerOverflow = this.el.current;
    if (containerOverflow) {
      if (containerOverflow.scrollWidth > this.props.width) {
        return true;
      }
      if (containerOverflow.scrollHeight > this.props.height) {
        return true;
      }
    }
    return false;
  }
  render() {
    const debug = this.props.debug;
    const styleText = {
      width: this.props.width,
      left: this.props.left,
      height: this.props.height,
      fontSize: this.props.fontSize,
      lineHeight: this.props.lineHeight,
      wordSpacing: this.props.wordSpacing,
      letterSpacing: this.props.letterSpacing,
      fontFamily: this.props.fontFamily,
      backgroundColor: randomColor()
    };
    return (
      <div
        className={[
          this.props.type,
          "fitTextCorrector",
          debug ? "debug" : ""
        ].join(" ")}
        ref={this.el}
        style={styleText}
      >
        {this.props.value ? this.props.value : null}
      </div>
    );
  }
}
module.exports = FitTextDiv;
