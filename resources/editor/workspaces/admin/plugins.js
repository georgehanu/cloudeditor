const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Fupa = require("../../plugins/Fupa");
const Toolbar = require("../../plugins/Toolbar");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  //Renderer: Renderer,
  Html5Renderer: Html5Renderer,
  Fupa: Fupa,
  Toolbar
};

const requires = {};

module.exports = { plugins, requires };
