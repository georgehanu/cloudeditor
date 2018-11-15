const React = require("react");
const uuidv4 = require("uuid/v4");
const { head } = require("ramda");
const { connect } = require("react-redux");
const { changePage } = require("./../stores/actions/project");
const Html5 = require("./../components/Renderer/Html5");

class PaginationItemContainer extends React.Component {
  state = {
    initial: true
  };
  onClickHandler(page_id) {
    this.props.onSetActiveImageHanlder(page_id);
  }
  componentDidMount() {
    this.setState({ initial: false });
  }
  render() {
    const groups = this.props.group.map(group => {
      let group_key = "";
      const items = group.map(item => {
        const page = head(item);
        group_key += page.id;
        return (
          <div
            key={page.id}
            className="pageItem"
            onClick={() => this.onClickHandler(page.id)}
          >
            <Html5
              viewOnly={true}
              initial={this.state.initial}
              active={page.active}
              key={page.id}
              init
              {...page.page}
            />
          </div>
        );
      });
      return (
        <div key={group_key} className="groupItem">
          {items}
        </div>
      );
    });
    return <React.Fragment>{groups}</React.Fragment>;
  }
}
const mapDispatchToProps = dispatch => {
  return { onSetActiveImageHanlder: payload => dispatch(changePage(payload)) };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(PaginationItemContainer);
