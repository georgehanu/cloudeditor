const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const SideBar = require("../../plugins/SideBar");
const Toolbar = require("../../plugins/Toolbar");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Renderer: Renderer,
  Toolbar: Toolbar
};

const requires = {};

module.exports = { plugins, requires };
