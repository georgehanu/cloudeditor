const React = require("react");
const { connect } = require("react-redux");
const { createSelector } = require("reselect");
const PropTypes = require("prop-types");
const { withNamespaces } = require("react-i18next");
const paginationSelectors = require("./../../stores/selectors/pagination");
const PaginationItemContainer = require("../../containers/PaginationItemContainer");

class Pagination extends React.Component {
  render() {
    const pages = this.props.pagesIds.map((page, index) => {
      return <PaginationItemContainer group={page} key={index} />;
    });
    return <div className="paginationContainer">{pages}</div>;
  }
}
const PaginationPlugin = connect(paginationSelectors.paginationPagesSelector)(
  withNamespaces("pagination")(Pagination)
);
module.exports = {
  Pagination: PaginationPlugin,
  reducers: {
    pagination: require("../../stores/reducers/pagination")
  }
};
