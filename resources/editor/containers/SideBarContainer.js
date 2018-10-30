const React = require("react");
const PropTypes = require("prop-types");

class SideBarContainer extends React.Component {
  getToolConfig = tool => {
    if (tool.tool) {
      return {};
    }
    return this.props.toolCfg || {};
  };

  getTool = tool => {
    return tool.plugin;
  };

  renderTools = () => {
    return this.props.tools.map((tool, i) => {
      const Tool = this.getTool(tool);
      const toolCfg = this.getToolConfig(tool);
      return (
        <Tool
          key={tool.name || "tool" + i}
          {...toolCfg}
          items={tool.items || []}
        />
      );
    });
  };
  render() {
    const Container = this.props.container;

    return (
      <div
        id={this.props.id}
        style={{ color: "blue" }}
        className={this.props.className}
      >
        <div id={this.props.id + "-container"} style={this.props.style}>
          {this.renderTools()}
        </div>
      </div>
    );
  }
}

SideBarContainer.propTypes = {
  id: PropTypes.string.isRequired,
  tools: PropTypes.array
};
SideBarContainer.defaultProps = {
  tools: []
};

module.exports = SideBarContainer;
