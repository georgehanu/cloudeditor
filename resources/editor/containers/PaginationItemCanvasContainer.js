const React = require("react");
const uuidv4 = require("uuid/v4");
const { head, forEachObjIndexed, prepend, takeLast, slice } = require("ramda");
const { connect } = require("react-redux");
const { changePage, changeGroups } = require("./../stores/actions/project");
const { groupsSelector } = require("./../stores/selectors/project");
const FabricjsRenderer = require("./../components/Renderer/Fabricjs/Renderer");
const Sortable = require("react-sortablejs");

class PaginationItemCanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: true,
      groups: this.props.group
    };
  }
  onClickHandler(params) {
    this.props.onChangePageHandler(params);
  }
  componentDidMount() {
    this.setState({ initial: false });
  }
  render() {
    let index = 0;
    const groups = this.props.group.map(group => {
      let group_key = "";
      const items = group.map(item => {
        const page = head(item);
        group_key = page.group_id;
        //debugger;
        return (
          <div
            data-id={page.id}
            key={page.id}
            className="pageItem"
            onClick={() =>
              this.onClickHandler({
                page_id: page.id,
                group_id: page.group_id
              })
            }
          >
            <FabricjsRenderer
              viewOnly={true}
              initial={this.state.initial}
              active={page.active}
              key={page.group_id}
              activePage={page.page}
              init
              {...page.page}
            />
          </div>
        );
      });
      return (
        <Sortable
          data-id="32"
          options={{ group: "shared" }}
          groupindex={group_key}
          onChange={(function(_this) {
            return function(order) {
              if (order.length) {
                const groupindex = this.groupindex;
                let groups = { ..._this.props.groups };
                groups[groupindex] = order;
                let lastGroups = null;
                let groupsAux = { ...groups };
                forEachObjIndexed((group, indexGroup) => {
                  if (lastGroups) {
                    groupsAux[indexGroup] = prepend(
                      head(lastGroups),
                      groupsAux[indexGroup]
                    );
                    lastGroups = null;
                  }
                  if (
                    groupsAux[indexGroup].length !=
                    _this.props.groups[indexGroup].length
                  ) {
                    const diff =
                      groupsAux[indexGroup].length -
                      _this.props.groups[indexGroup].length;
                    lastGroups = takeLast(diff, groupsAux[indexGroup]);
                    groupsAux[indexGroup] = slice(
                      0,
                      _this.props.groups[indexGroup].length,
                      groupsAux[indexGroup]
                    );
                  }
                }, groups);

                _this.props.onChangeGroupHandler(groupsAux);
              }
            };
          })(this)}
          key={group_key}
          className="groupItem"
        >
          {items}
        </Sortable>
      );
    });
    return <React.Fragment>{groups}</React.Fragment>;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangePageHandler: payload => dispatch(changePage(payload)),
    onChangeGroupHandler: payload => dispatch(changeGroups(payload))
  };
};
const mapStateToProps = state => {
  return {
    groups: groupsSelector(state)
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationItemCanvasContainer);
