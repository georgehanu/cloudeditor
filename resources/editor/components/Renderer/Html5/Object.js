const React = require("react");

const randomColor = require("randomcolor");
const ImageBlock = require("./Image");
const TextBlock = require("./Text");
const { forEach } = require("ramda");
const { connect } = require("react-redux");
const {
  addObjectIdToSelected,
  removeSelection
} = require("./../../../stores/actions/project");

require("webpack-jquery-ui/draggable");
require("webpack-jquery-ui/resizable");

class ObjectBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.state = {
      editableActive: false
    };
    this.blurSelectors = ["test", "index"];
  }
  bindEvents() {
    const element = this.el.current;
    element.addEventListener("click", this.onClickHandler.bind(this), false);
    document.addEventListener(
      "click",
      this.onClickHandlerOutside.bind(this),
      false
    );
  }

  componentDidMount() {
    const element = this.el.current;
    const { movable, resizable, rotatable } = this.props;
    if (element) {
      if (movable) {
        $(element).draggable({
          snap: ".drag_alignLines",
          stop: (event, ui) => {
            this.props.onUpdateProps({
              id: this.props.id,
              props: {
                top: ui.position.top / this.props.scale,
                left: ui.position.left / this.props.scale
              }
            });
          }
        });
      }
      if (resizable) {
        $(element).resizable({
          stop: (event, ui) => {
            this.props.onUpdateProps({
              id: this.props.id,
              props: {
                width: ui.size.width / this.props.scale,
                height: ui.size.height / this.props.scale
              }
            });
          }
        });
      }
    }
    // here we bind the event
    this.bindEvents();
  }

  onClickHandler() {
    const element = this.el.current;
    const { editableActive } = this.state;
    const { movable } = this.props;
    if (!editableActive) {
      if (movable) $(element).draggable("disable");
      this.setState({ editableActive: true });
      this.props.onSetActiveBlockHandler(this.props.id);
    }
  }

  blurComponent(target) {
    const blurSelectors = [...this.blurSelectors];
    let isBlur = true;
    blurSelectors.forEach(element => {
      const trigger = $(element);
      const cursorTarget = $(target);
      if (trigger[0] === cursorTarget[0]) {
        isBlur = false;
      }
      const target = $(blurSelectors).find(target);
      if (target.length > 0) isBlur = false;
    });
    if (!isBlur) {
      this.setState({ editableActive: false });
      this.props.onRemoveActiveBlockHandler(this.props.id);
    }
  }
  onClickHandlerOutside(event) {
    const element = this.el.current;
    const { movable } = this.props;
    const { editableActive } = this.state;
    if (editableActive) {
      if (!element.contains(event.target)) {
        if (movable) $(element).draggable("enable");
        this.blurComponent();
      }
    }
  }
  render() {
    const { width, height, top, left, type, ...otherProps } = this.props;
    const style = {
      width: width,
      height: height,
      left: left,
      top: top,
      position: "absolute",
      backgroundColor: randomColor()
    };
    let element = null;

    switch (type) {
      case "image":
        element = (
          <ImageBlock
            editableActive={this.state.editableActive}
            {...this.props}
          />
        );
        break;
      case "text":
      case "textflow":
        element = (
          <TextBlock
            editableActive={this.state.editableActive}
            {...this.props}
          />
        );
        break;
      default:
        break;
    }
    return (
      <div
        className={[
          "page-block",
          type,
          this.state.editableActive ? "edit" : "",
          this.props.editable ? "editable" : ""
        ].join(" ")}
        style={style}
        ref={this.el}
      >
        <div className={this.props.orientation}>{element}</div>
        <div className="blockOrder" />
        <u />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetActiveBlockHandler: payload =>
      dispatch(addObjectIdToSelected(payload)),
    onRemoveActiveBlockHandler: payload => dispatch(removeSelection(payload))
  };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(ObjectBlock);

// const objectBlock = React.forwardRef((props, ref) => {
//   console.log(ref, props);
//   const { width, height, top, left, ...otherProps } = props;
//   const style = {
//     width: width,
//     height: height,
//     left: left,
//     top: top,
//     backgroundColor: randomColor()
//   };
//   return (
//     <div
//       className="page-block"
//       style={style}
//       onClick={props.onClick}
//       ref={ref}
//     />
//   );
// });

// module.exports = Drr(objectBlock);
