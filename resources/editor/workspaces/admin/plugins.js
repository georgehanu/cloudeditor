const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Fupa = require("../../plugins/Fupa");
const DI = require("../../plugins/DI");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  //Renderer: Renderer,
  Html5Renderer: Html5Renderer,
  Fupa: Fupa,
  DI: DI
};

const requires = {};

module.exports = { plugins, requires };
