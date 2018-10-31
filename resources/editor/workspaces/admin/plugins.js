const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const SideBar = require("../../plugins/SideBar");
const Snap = require("../../plugins/Snap");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Renderer: Renderer,
  Snap: Snap
};

const requires = {};

module.exports = { plugins, requires };
