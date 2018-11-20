const React = require("react");
const { connect } = require("react-redux");
const assign = require("object-assign");
import "../themes/default/zoom/styles/editor_zoom.css";
const {
  uiZoomSelector,
  uiFullWidthSelector,
  uiFullHeightSelector,
  uiViewportTransformSelector
} = require("../stores/selectors/toolbar");
const { values, merge } = require("ramda");
const { getCanvas } = require("../globals");
const uiActions = require("../stores/actions/ui");
class Zoom extends React.Component {
  ignoreScroll = false;
  constructor(props) {
    super(props);
    this.state = {
      eventAttached: false,
      offset: 17,
      containerStyle: {
        width: 0,
        height: 0
      },
      scrollerDesign: {
        width: 0,
        height: 0
      }
    };
  }
  updateScrollerDimensions = canvasReady => {
    if (!canvasReady) {
      return;
    }
    this.instance = getCanvas();
    if (
      this.refs.scrollerContainer.parentNode.getElementsByClassName(
        "canvas-container"
      ).length
    ) {
      let boundingBox = this.refs.scrollerContainer.parentNode
        .getElementsByClassName("canvas-container")[0]
        .getBoundingClientRect();
      boundingBox.width += this.state.offset;
      boundingBox.height += this.state.offset;
      if (
        this.state.containerStyle.width != boundingBox.width ||
        this.state.containerStyle.height != boundingBox.height
      ) {
        this.setState({
          containerStyle: {
            width: boundingBox.width,
            height: boundingBox.height
          }
        });
      }
    }
  };
  attachEvents = () => {
    if (
      this.refs.scrollerContainer.parentNode.getElementsByClassName(
        "canvas-container"
      ).length
    ) {
      this.refs.scrollerContainer.parentNode
        .getElementsByClassName("canvas-container")[0]
        .addEventListener("wheel", this._onWheel);
    }
    this.refs.scrollerContainer.addEventListener("scroll", this._onScroll);
    //  this.setState({ eventAttached: true });
  };
  _onScroll = e => {
    let ignoreIt = this.ignoreScroll;
    this.ignoreScroll = false;
    if (ignoreIt) return;

    let scrollLeft = e.target.scrollLeft,
      scrollTop = e.target.scrollTop;
    this.instance.viewportTransform[4] = -scrollLeft;
    this.instance.viewportTransform[5] = -scrollTop;
    this.props.updateZoomHandler({
      viewportTransform: {
        a: this.instance.viewportTransform[0],
        b: this.instance.viewportTransform[1],
        c: this.instance.viewportTransform[2],
        d: this.instance.viewportTransform[3],
        e: this.instance.viewportTransform[4],
        f: this.instance.viewportTransform[5]
      },
      zoom: this.props.zoom
    });
    this.instance.renderAll();
    var objects = this.instance.getObjects();
    for (let i = 0; i < objects.length; i++) {
      objects[i].setCoords();
    }
  };
  _onWheel = e => {
    let deltaY = e.deltaY < 0 ? -100 : 100,
      newZoom = Math.round((this.props.zoom + deltaY / 2500) * 100) / 100;
    if (newZoom < 1) return;

    let getMiddleOffsetX = this.props.fullWidth / 2,
      getMiddleOffsetY = this.props.fullHeight / 2;

    if (this.props.zoom > newZoom) {
      getMiddleOffsetX =
        (this.props.viewportTransform.e * this.props.fullWidth) /
        2 /
        -(
          (this.props.fullWidth * this.props.viewportTransform.a -
            this.props.fullWidth) /
          2
        );
      getMiddleOffsetY =
        (this.props.viewportTransform.f * this.props.fullHeight) /
        2 /
        -(
          (this.props.fullHeight * this.props.viewportTransform.d -
            this.props.fullHeight) /
          2
        );
    }
    this.instance.zoomToPoint(
      { x: getMiddleOffsetX, y: getMiddleOffsetY },
      newZoom
    );

    this.props.updateZoomHandler({
      viewportTransform: {
        a: this.instance.viewportTransform[0],
        b: this.instance.viewportTransform[1],
        c: this.instance.viewportTransform[2],
        d: this.instance.viewportTransform[3],
        e: this.instance.viewportTransform[4],
        f: this.instance.viewportTransform[5]
      },
      zoom: newZoom
    });
    this.updateSize();
    this.ignoreScroll = true;
  };
  updateSize = () => {
    let viewportTransform = values(this.props.viewportTransform),
      point = fabric.util.transformPoint(
        { x: this.props.fullWidth, y: this.props.fullHeight },
        viewportTransform,
        1
      );
    this.setState({
      scrollerDesign: {
        width: point.x,
        height: point.y
      }
    });
    this.refs.scrollerContainer.scrollLeft = Math.abs(
      this.props.viewportTransform.e
    );
    this.refs.scrollerContainer.scrollTop = Math.abs(
      this.props.viewportTransform.f
    );
  };
  componentDidMount = () => {
    this.updateScrollerDimensions(this.props.canvasReady);
  };
  componentDidUpdate = () => {
    //   this.updateScrollerDimensions(this.props.canvasReady);
    // if (this.props.canvasReady && !this.state.eventAttached) {
    this.attachEvents();
    //}
  };
  render() {
    let style = this.state.containerStyle;
    if (this.props.zoom == 1) {
      style = merge(style, {
        display: "none"
      });
    }
    return (
      <div className="scrollerContainer" ref="scrollerContainer" style={style}>
        <div
          className="scrollDesign"
          ref="scrollDesign"
          style={this.state.scrollerDesign}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    canvasReady: 1,
    zoom: uiZoomSelector(state),
    fullWidth: uiFullWidthSelector(state),
    fullHeight: uiFullHeightSelector(state),
    viewportTransform: uiViewportTransformSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateZoomHandler: params => dispatch(uiActions.updateZoom(params))
  };
};
const ZoomPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Zoom);

// let's export the plugin and a set of required reducers
module.exports = {
  Zoom: assign(ZoomPlugin, {
    Html5Renderer: {
      position: 1,
      priority: 1
    }
  })
};
