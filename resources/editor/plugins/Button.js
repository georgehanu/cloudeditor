const React = require("react");
const designerActions = require("../stores/actions/designer");
const { connect } = require("react-redux");

class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFunction(this.props.actionType);
  };

  render() {
    return (
      <button actionType={this.props.actionType} onClick={this.handleClick}>
        {this.props.buttonTitle}
      </button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}
module.exports = connect(
  null,
  mapDispatchToProps
)(Button);
