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
      editableActive: false,
      blockEditor: 0
    };
    this.blurSelectors = ["test", "index"];
  }

  bindEvents() {
    const element = this.el.current;
    element.addEventListener("click", this.onClickHandler.bind(this), false);
  }

  componentDidMount() {
    const element = this.el.current;
    const { movable, resizable, rotatable } = this.props;
    // here we bind the event
    this.bindEvents();
    // if (element) {
    //   if (movable) {
    //     $(element).draggable({
    //       snap: ".drag_alignLines",
    //       start: () => {
    //         this.setState({ blockEditor: 0 });
    //       },
    //       stop: (event, ui) => {
    //         this.setState({ blockEditor: 0 });
    //         this.props.onUpdateProps({
    //           id: this.props.id,
    //           props: {
    //             top: ui.position.top / this.props.scale,
    //             left: ui.position.left / this.props.scale
    //           }
    //         });
    //       }
    //     });
    //   }
    //   if (resizable) {
    //     $(element).resizable({
    //       stop: (event, ui) => {
    //         this.props.onUpdateProps({
    //           id: this.props.id,
    //           props: {
    //             width: ui.size.width / this.props.scale,
    //             height: ui.size.height / this.props.scale
    //           }
    //         });
    //       }
    //     });
    //   }
    // }
  }

  updateDraggable(status) {
    let el = $(this.el.current);
    const { movable } = this.props;
    if (el.length && movable) {
      if (!status) {
        this.disableDraggable(el);
      } else {
        this.enableDraggable(el);
      }
    }
  }
  disableDraggable(el) {
    el.draggable("disable");
  }
  enableDraggable(el) {
    el.draggable("enable");
  }
  onClickHandler(event) {
    const element = this.el.current;
    const { movable, editable } = this.props;
    const { editableActive, blockEditor } = this.state;
    this.props.onSetActiveBlockHandler(this.props.id);
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
