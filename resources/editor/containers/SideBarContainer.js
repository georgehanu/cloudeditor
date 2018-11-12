import SidebarButton from "../components/sidebar/SidebarButton";
import PaneContainer from "../components/sidebar/PaneContainer";

const React = require("react");
const PropTypes = require("prop-types");

class SideBarContainer extends React.Component {
  state = {
    showPane: false,
    pluginIndex: null
  };
  getToolConfig = tool => {
    if (tool.tool) {
      return {};
    }
    return this.props.toolCfg || {};
  };

  getTool = tool => {
    return tool.plugin;
  };

  showPlugin = pluginIndex => {
    if (this.state.showPane && this.state.pluginIndex === pluginIndex) {
      this.setState({ showPane: false, pluginIndex: null });
    } else {
      this.setState({ showPane: true, pluginIndex });
    }
  };

  renderTools = () => {
    return this.props.tools.map((tool, i) => {
      const Tool = this.getTool(tool);
      const toolCfg = this.getToolConfig(tool);

      const iconStyle = "icon " + (tool.icon ? tool.icon : "");
      return (
        <li key={i}>
          <SidebarButton
            clicked={() => this.showPlugin(i)}
            selected={i === this.state.pluginIndex ? true : false}
            tooltip={tool.tooltip}
          >
            <div className={iconStyle} />
            <div className="IconTitle">{tool.text}</div>
            {tool.showMore && (
              <span className="icon More printqicon-lefttriangle" />
            )}
          </SidebarButton>
          <PaneContainer visible={i === this.state.pluginIndex ? true : false}>
            <Tool {...toolCfg} items={tool.items || []} />;
          </PaneContainer>
        </li>
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
          <ul>{this.renderTools()}</ul>
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
