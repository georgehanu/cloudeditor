const React = require("react");
const { connect } = require("react-redux");
const { withNamespaces } = require("react-i18next");
const paginationSelectors = require("./../../stores/selectors/pagination");
const PaginationItemContainer = require("../../containers/PaginationItemContainer");

class Pagination extends React.PureComponent {
  render() {
    return (
      <div className="paginationContainer">
        <PaginationItemContainer group={this.props.pagesIds} />
      </div>
    );
  }
}
const PaginationPlugin = connect(paginationSelectors.paginationPagesSelector)(
  withNamespaces("pagination")(Pagination)
);
module.exports = {
  Pagination: PaginationPlugin
};
