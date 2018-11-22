const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Snap = require("../../plugins/Snap");
const Toolbar = require("../../plugins/Toolbar");
const Zoom = require("../../plugins/Zoom");
const Pagination = require("../../plugins/Html5Plugins/Pagination");
const ZoomButtons = require("../../plugins/ZoomButtons");
const Fupa = require("../../plugins/Fupa");
const DI = require("../../plugins/DI");

const plugins = {
  SideBar: SideBar,
  AddButton: AddButton,
  TabBar: TabBar,
  Html5Renderer: Html5Renderer,
  Renderer: Renderer,
  Snap: Snap,
  Toolbar: Toolbar,
  Zoom: Zoom,
  Pagination: Pagination,
  ZoomButtons: ZoomButtons,
  //Renderer: Renderer,
  Fupa: Fupa,
  DI: DI
};

const requires = {};

module.exports = { plugins, requires };
