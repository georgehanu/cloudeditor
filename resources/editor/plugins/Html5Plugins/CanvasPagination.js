const React = require("react");
const { connect } = require("react-redux");
const { withNamespaces } = require("react-i18next");
const paginationSelectors = require("./../../stores/selectors/pagination");
const PaginationItemCanvasContainer = require("../../containers/PaginationItemCanvasContainer");

class CanvasPagination extends React.PureComponent {
  render() {
    return (
      <div className="paginationContainer">
        <PaginationItemCanvasContainer group={this.props.pagesIds} />
      </div>
    );
  }
}
const CanvasPaginationPlugin = connect(
  paginationSelectors.paginationPagesSelector
)(withNamespaces("pagination")(CanvasPagination));
module.exports = {
  CanvasPagination: CanvasPaginationPlugin
};
