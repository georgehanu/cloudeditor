const Renderer = require("../../plugins/Renderer");
//const Html5Renderer = require("../../plugins/Html5Renderer");
const DesignAndGo = require("../../plugins/DesignAndGo");

const plugins = {
  DesignAndGo: DesignAndGo,
  Renderer: Renderer
};

const requires = {};

module.exports = { plugins, requires };
