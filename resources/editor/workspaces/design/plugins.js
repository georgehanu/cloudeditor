const Renderer = require("../../plugins/Renderer");
const DesignAndGo = require("../../plugins/DesignAndGo");

const plugins = {
  DesignAndGo: DesignAndGo,
  Renderer: Renderer
};

const requires = {};

module.exports = { plugins, requires };
