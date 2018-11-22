const React = require("react");
const PropTypes = require("prop-types");
const { debounce } = require("underscore");
const randomColor = require("randomcolor");

const uuidv4 = require("uuid/v4");
const { connect } = require("react-redux");
const { snapLinesSelector } = require("../../stores/selectors/Html5/SnapLines");
const {
  changeObjectPosition,
  changeObjectDimensions,
  updateObjectProps
} = require("./../../stores/actions/project");

const Objects = require("./Html5/Objects");
const Lines = require("./Html5/SnapLines");
const Boxes = require("./Html5/Boxes/Boxes");

class Html5Renderer extends React.Component {
  state = {
    scale: 1,
    componentReady: false
  };

  constructor(props) {
    super(props);
    this.canvasContainerRef = React.createRef();
  }
  shouldComponentUpdate() {
    if (!this.props.viewOnly) {
      return true;
    }
    if (this.props.viewOnly) {
      if (this.props.active || this.props.initial) {
        return true;
      }
      return false;
    }
    return true;
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
      let LinesRender = null;
      let BoxesRender = null;
      if (!this.props.viewOnly) {
        LinesRender = <Lines lines={this.props.snapLines} scale={scale} />;
        BoxesRender = <Boxes scale={scale} />;
      }
      page = (
        <div
          className="page-container page"
          style={{
            width: width,
            height: height,
            backgroundColor: randomColor()
          }}
        >
          <Objects
            viewOnly={this.props.viewOnly}
            items={this.props.objects}
            onUpdateProps={this.props.onUpdatePropsHandler}
            scale={scale}
          />
          {BoxesRender}
          {LinesRender}
          <div id="fitTextEscaper" />
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
const mapStateToProps = state => {
  return {
    snapLines: snapLinesSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdatePropsHandler: payload => dispatch(updateObjectProps(payload))
  };
};
module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Html5Renderer);
