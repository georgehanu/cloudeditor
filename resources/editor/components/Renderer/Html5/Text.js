const React = require("react");
const randomColor = require("randomcolor");
const ReactDOM = require("react-dom");
const { Editor, EditorState, convertToRaw, RichUtils } = require("draft-js");
const Escaper = require("../../../plugins/Html5Renderer/helpers/PrintqEscaper");

class TextBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => {
      const contentState = editorState.getCurrentContent();
      console.log("contentState", convertToRaw(contentState));
      this.setState({ editorState });
    };
    this.setEditor = editor => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }
  componentDidUpdate() {
    if (this.props.active) this.focusEditArea();
  }
  componentDidMount() {
    const element = this.el.current;
    //  element.addEventListener("keyup", this.onKeyupHandler.bind(this), false);
  }
  onKeyupHandler(event) {
    const text = Escaper.pqDecodeEntities(this.el.current);
    console.log(text);
  }
  focusEditArea() {
    this.editor.focus();
    //  this.applyStyle("BOLD", this.state.editorState);
  }
  applyStyle = (style, editorState) => {
    const editorStateFocused = EditorState.forceSelection(
      editorState,
      editorState.getSelection()
    );
    return this.onChange(
      RichUtils.toggleInlineStyle(editorStateFocused, style)
    );
  };
  myblockStyleFn() {
    return "block_data";
  }
  render() {
    const { key, width, height, top, left, ...otherProps } = this.props;

    const style = {
      width: width,
      maxWidth: width,
      verticalAlign: this.props.vAlign,
      textAlign: this.props.textAlign,
      textDecoration: this.props.underline ? "underline" : "none",
      fontWeight: this.props.bold ? "bold" : "normal",
      fontStyle: this.props.italic ? "italic" : "normal",
      backgroundColor: randomColor()
    };
    const styleMap = {
      block_data: {
        ...style
      }
    };
    return (
      <Editor
        ref={this.setEditor}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    );
  }
}

module.exports = TextBlock;
