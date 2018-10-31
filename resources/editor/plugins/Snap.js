const React = require("react");
const { connect } = require("react-redux");

class Snap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false
    };
  }
  onObjectMoving = () => {};

  toggleSnap = () => {
    this.setState({
      isEnable: !this.state.isEnable
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.toggleSnap}>Toogle Snap</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const SnapPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Snap);

// let's export the plugin and a set of required reducers
module.exports = {
  Snap: SnapPlugin,
  injects: {
    Renderer: {}
  }
};
