//const theme = require("../../themes/default/theme.scss");
//const designAndGo = require("../../themes/dark/designAndGo/plugin.scss");

// path from the theme folder
const Default = ["default/theme.scss", "default/designAndGo/plugin.scss"];

const Dark = ["dark/theme.scss", "dark/designAndGo/plugin.scss"];

const Themes = {
  default: Default,
  dark: Dark
};

const PluginAssets = ["designAndGo"];

module.exports = {
  Themes,
  PluginAssets
};
