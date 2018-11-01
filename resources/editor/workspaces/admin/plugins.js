const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Snap = require("../../plugins/Snap");
const Toolbar = require("../../plugins/Toolbar");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Renderer: Renderer,
  Snap: Snap,
  Toolbar: Toolbar,
  Html5Renderer: Html5Renderer
};

const requires = {};

module.exports = { plugins, requires };
