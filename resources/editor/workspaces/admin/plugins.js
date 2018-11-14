const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Snap = require("../../plugins/Snap");
const Toolbar = require("../../plugins/Toolbar");
const Zoom = require("../../plugins/Zoom");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Html5Renderer: Html5Renderer,
  Renderer: Renderer,
  Snap: Snap,
  Toolbar: Toolbar,
  Zoom: Zoom
};

const requires = {};

module.exports = { plugins, requires };
