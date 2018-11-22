const React = require("react");

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
    const styleText = {
      width: this.props.width,
      height: this.props.height,
      fontSize: this.props.fontSize,
      lineHeight: this.props.lineHeight,
      wordSpacing: this.props.wordSpacing,
      letterSpacing: this.props.letterSpacing,
      fontFamily: this.props.fontFamily
    };
    return (
      <div
        className={this.props.type}
        ref={this.el}
        style={styleText}
        id="fitTextCorrector"
      >
        {this.props.text}
      </div>
    );
  }
}
module.exports = FitTextDiv;
