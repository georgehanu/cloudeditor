const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

class Html5Renderer extends React.Component {
  render() {
    return <div className="canvas-container" ref={this.canvasContainerRef} />;
  }
}
Html5Renderer.propTypes = {};

Html5Renderer.defaultProps = {};

const mapStateToProps = null;
const mapDispatchToProps = null;

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Html5Renderer);
