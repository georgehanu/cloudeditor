const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Toolbar = require("../../plugins/Toolbar");
const AddText = require("../../plugins/AddText");
const AddImage = require("../../plugins/AddImage");
const AddPdf = require("../../plugins/AddPdf");
const BlocksProp = require("../../plugins/BlocksProps");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Renderer: Renderer,
  Toolbar: Toolbar,
  Html5Renderer: Html5Renderer,
  AddText: AddText,
  AddImage: AddImage,
  AddPdf: AddPdf,
  BlocksProp
};

const requires = {};

module.exports = { plugins, requires };
