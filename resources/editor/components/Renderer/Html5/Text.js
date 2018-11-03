const React = require("react");
const randomColor = require("randomcolor");
const ReactDOM = require("react-dom");
const Escaper = require("../../../plugins/Html5Renderer/helpers/PrintqEscaper");

class TextBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }
  componentDidUpdate() {
    if (this.props.active) this.focusEditArea();
  }
  componentDidMount() {
    const element = this.el.current;
    element.addEventListener("keyup", this.onKeyupHandler.bind(this), false);
  }
  onKeyupHandler(event) {
    const text = Escaper.pqDecodeEntities(this.el.current);
    console.log(text);
  }
  focusEditArea() {
    this.el.current.focus();
  }
  render() {
    const { key, width, height, top, left, ...otherProps } = this.props;
    const style = {
      width: width,
      maxWidth: width,
      verticalAlign: this.props.valignment,
      textAlign: this.props.alignment,
      backgroundColor: randomColor()
    };
    return (
      <div
        ref={this.el}
        className={this.props.type}
        style={style}
        contentEditable={this.props.active}
      >
        {this.props.value ? this.props.value : null}
      </div>
    );
  }
}

module.exports = TextBlock;
