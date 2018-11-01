const React = require("react");
const PropTypes = require("prop-types");
const { debounce } = require("underscore");
const uuidv4 = require("uuid/v4");
const { connect } = require("react-redux");

const {
  changeObjectPosition,
  changeObjectDimensions
} = require("./../../stores/actions/project");

const Objects = require("./Html5/Objects");

class Html5Renderer extends React.Component {
  state = {
    scale: 1,
    componentReady: false
  };

  constructor(props) {
    super(props);
    this.canvasContainerRef = React.createRef();
  }

  updatePageOffset = () => {
    const canvasContainer = this.canvasContainerRef.current;
    if (canvasContainer) {
      const page = {
          width: this.props.width,
          height: this.props.height
        },
        canvas = {
          width: canvasContainer.offsetWidth,
          height: canvasContainer.offsetHeight
        };

      let scale = Math.min(
        canvas.width / page.width,
        canvas.height / page.height
      );

      this.setState({ scale: scale, componentReady: true });
    }
  };

  componentDidMount() {
    this.updatePageOffset();
    window.addEventListener("resize", debounce(this.updatePageOffset));
  }
  render() {
    let page = null;
    let elements = null;
    if (this.state.componentReady) {
      let { width, height, objects } = this.props;
      const scale = this.state.scale;
      width *= scale;
      height *= scale;

      page = (
        <div
          className="page-container"
          style={{ width: width, height: height }}
        >
          <Objects
            items={this.props.objects}
            onDrag={this.onDragHandler}
            onDragStop={this.props.onDragStopHandler}
            onResizeStop={this.props.onResizeStopHandler}
            scale={scale}
          />
        </div>
      );
    }

    return (
      <div className="canvas-container" ref={this.canvasContainerRef}>
        {page}
      </div>
    );
  }
}

Html5Renderer.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  objects: PropTypes.object,
  background: PropTypes.object
};
Html5Renderer.defaultProps = {
  id: uuidv4(),
  width: 1200,
  height: 600,
  objects: {},
  background: {
    type: "none"
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onDragStopHandler: payload => dispatch(changeObjectPosition(payload)),
    onResizeStopHandler: payload => dispatch(changeObjectDimensions(payload))
  };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(Html5Renderer);
