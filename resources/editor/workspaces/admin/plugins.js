const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Toolbar = require("../../plugins/Toolbar");
const AddText = require("../../plugins/AddText");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Renderer: Renderer,
  Toolbar: Toolbar,
  Html5Renderer: Html5Renderer,
  AddText: AddText
};

const requires = {};

module.exports = { plugins, requires };
