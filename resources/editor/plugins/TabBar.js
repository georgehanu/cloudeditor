const React = require("react");
const { connect } = require("react-redux");
const tabBarActions = require("../stores/actions/tabBar");
const assign = require("object-assign");

class TabBar extends React.Component {
  render() {
    return (
      <div className="tabBar">
        {this.props.expanded ? 1 : 0}
        <button onClick={this.props.toogleTabBarHandler}>toogle</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expanded: state.tabBar.expanded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toogleTabBarHandler: () => {
      dispatch(tabBarActions.toogleTabBar());
    }
  };
};

const TabBarPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBar);

// let's export the plugin and a set of required reducers
module.exports = {
  TabBar: assign(TabBarPlugin, {
    SideBar: {
      position: 2,
      priority: 1
    }
  }),
  reducers: {
    tabBar: require("../stores/reducers/tabBar"),
    theme: require("../stores/reducers/theme")
  }
};
