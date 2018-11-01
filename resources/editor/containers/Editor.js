const React = require("react");
const { Provider } = require("react-redux");
const { Consumer } = require("react-redux");
const assign = require("object-assign");

const PluginsContainer = require("../components/plugins/PluginsContainer");
const ProjectUtils = require("../utils/ProjectUtils");
const ConfigUtils = require("../utils/ConfigUtils");
const PluginsUtils = require("../utils/PluginsUtils");
const StandardStore = require("../stores/StandardStore");

const EDITOR_WORKSPACE = process.env.MIX_EDITOR_WORKSPACE || "admin";
const { plugins, requires } = require("../workspaces/" +
  EDITOR_WORKSPACE +
  "/plugins");
require("../workspaces/" + EDITOR_WORKSPACE + "/theme.js");

ConfigUtils.loadConfiguration({ workspace: EDITOR_WORKSPACE });

const store = StandardStore(ProjectUtils.getEmptyProject(), {}, {}, plugins);

const { withNamespaces } = require("react-i18next");

class Editor extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div id="wrapper" className="toggled">
          <PluginsContainer
            mode="desktop"
            plugins={assign(PluginsUtils.getPlugins(plugins), { requires })}
            pluginsConfig={ConfigUtils.getConfigProp("plugins")}
          />
        </div>
      </Provider>
    );
  }
}

module.exports = withNamespaces("translate")(Editor);
