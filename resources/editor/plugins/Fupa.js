const React = require("react");
const { connect } = require("react-redux");
const assign = require("object-assign");
const FupaBuilder = require("./Fupa/FupaBuilder");

class Fupa extends React.Component {
  render() {
    return <FupaBuilder />;
  }
}

// let's export the plugin and a set of required reducers

const FupaPlugin = connect(
  null,
  null
)(Fupa);

module.exports = {
  Fupa: assign(FupaPlugin, {
    SideBar: {
      position: 1,
      priority: 1,
      text: "Fupa",
      icon: "printqicon-newtext",
      showMore: true,
      tooltip: { title: "Fupa", description: "Description" }
    }
  }),
  reducers: { fupa: require("./Fupa/store/reducers") },
  epics: require("./Fupa/store/epics")
};