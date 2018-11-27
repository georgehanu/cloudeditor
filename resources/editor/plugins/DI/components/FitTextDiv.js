const React = require("react");
const PropTypes = require("prop-types");
const randomColor = require("randomcolor");
require("./FitTextDiv.css");

class FitTextDiv extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  applyFnc = fs => {
    this.el.current.style.fontSize = fs + "px";
  };

  adjustFit = () => {
    const overflow = this.returnOverflow();
    if (overflow) {
      const newFontSize = this.props.process(
        this.props.minFontSize,
        this.props.fontSize,
        this.returnOverflow,
        this.applyFnc,
        0
      );

      this.props.onUpdateProps({
        id: this.props.id,
        props: {
          fontSize: newFontSize
        }
      });
    }
  };

  componentDidMount() {
    this.adjustFit();
  }
  componentDidUpdate() {
    this.adjustFit();
  }
  returnOverflow = () => {
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
  };
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
      textDecoration: this.props.underline ? "underline" : "none",
      fontWeight: this.props.bold ? "bold" : "normal",
      fontStyle: this.props.italic ? "italic" : "normal",
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

FitTextDiv.propTypes = {
  minFontSize: PropTypes.number,
  fontSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  underline: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wordSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  letterSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontFamily: PropTypes.string
};

FitTextDiv.defaultProps = {
  minFontSize: 1,
  fontSize: 12,
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  underline: 0,
  bold: 0,
  italic: 0,
  lineHeight: "normal",
  wordSpacing: "normal",
  letterSpacing: "normal",
  fontFamily: "Arial"
};

module.exports = FitTextDiv;
