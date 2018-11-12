const React = require("react");
const { connect } = require("react-redux");
const assign = require("object-assign");

class Fupa extends React.Component {
  render() {
    return <div>Fupa</div>;
  }
}

// let's export the plugin and a set of required reducers

const FupaPlugin = connect(
  null,
  null
)(Fupa);

module.exports = {
  Fupa: assign(FupaPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 1,
      priority: 1
    }
  }),
  reducers: { addButton: require("../stores/reducers/addButton") },
  epics: require("../stores/epics/addButton")
};
