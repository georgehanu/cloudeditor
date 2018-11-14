const Renderer = require("../../plugins/Renderer");
const DesignAndGo = require("../../plugins/DesignAndGo");
const DesignAndGoMenu = require("../../plugins/DesignAndGoMenu");

const plugins = {
  DesignAndGo: DesignAndGo,
  Renderer: Renderer,
  DesignAndGoMenu
};

const requires = {};

module.exports = { plugins, requires };
