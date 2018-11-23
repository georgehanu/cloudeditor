const React = require("react");
const randomColor = require("randomcolor");
const ReactDOM = require("react-dom");
const ContentEditable = require("react-contenteditable").default;

const Escaper = require("../../../plugins/Html5Renderer/helpers/PrintqEscaper");

class TextBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      text: "defaultText"
    };
  }

  handleChange = evt => {
    const text = evt.target.value;
    this.props.onUpdateProps({
      id: this.props.id,
      props: {
        value: text
      }
    });
  };

  onKeyupHandler(event) {
    const text = Escaper.pqDecodeEntities(this.el.current);
  }

  render() {
    const { key, width, height, top, left, ...otherProps } = this.props;
    const style = {
      width: width,
      maxWidth: width,
      fontFamily: this.props.fontFamily,
      verticalAlign: this.props.vAlign,
      textAlign: this.props.textAlign,
      textDecoration: this.props.underline ? "underline" : "none",
      fontWeight: this.props.bold ? "bold" : "normal",
      fontStyle: this.props.italic ? "italic" : "normal"
    };
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        ref={this.contentEditable}
        className={this.props.type}
        style={style}
        html={this.props.value}
        onChange={this.handleChange}
        tagName="div"
      />
    );
  }
}

module.exports = TextBlock;
