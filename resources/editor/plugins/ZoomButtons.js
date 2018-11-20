const React = require("react");
const { connect } = require("react-redux");
const assign = require("object-assign");
const { zoomSelector } = require("../../editor/stores/selectors/project");
const { changeZoom } = require("../../editor/stores/actions/ui");
class ZoomButtons extends React.Component {
  onChangeZoom(unit) {
    const zoom = this.props.zoom;
    const unitZoom = parseFloat(zoom) + unit;
    if (unitZoom >= 1) this.props.changeZoomHandler(unitZoom);
  }
  render() {
    return (
      <div className="zoomContainer">
        <div
          className="zoomInButton zoomButton"
          onClick={() => {
            this.onChangeZoom(+0.1);
          }}
        >
          Zoom In
        </div>
        <div className="zoomText">
          {parseInt(this.props.zoom * 100).toFixed(0)}%
        </div>
        <div
          className={[
            "zoomOutButton",
            "zoomButton",
            this.props.zoom == 1 ? "disabled" : ""
          ].join(" ")}
          onClick={() => {
            this.onChangeZoom(-0.1);
          }}
        >
          Zoom Out
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    zoom: zoomSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return { changeZoomHandler: payload => dispatch(changeZoom(payload)) };
};
const ZoomButtonsPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoomButtons);

module.exports = {
  ZoomButtons: assign(ZoomButtonsPlugin, {
    SideBar: {
      position: 1,
      priority: 1
    }
  })
};
