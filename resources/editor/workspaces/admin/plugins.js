const AddButton = require("../../plugins/AddButton");
const TabBar = require("../../plugins/TabBar");
const Renderer = require("../../plugins/Renderer");
const Html5Renderer = require("../../plugins/Html5Renderer");
const SideBar = require("../../plugins/SideBar");
const Snap = require("../../plugins/Snap");
const Toolbar = require("../../plugins/Toolbar");
const Zoom = require("../../plugins/Zoom");
const Pagination = require("../../plugins/Html5Plugins/Pagination");
const CanvasPagination = require("../../plugins/Html5Plugins/CanvasPagination");
const ZoomButtons = require("../../plugins/ZoomButtons");

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
  CanvasPagination: CanvasPagination,
  ZoomButtons: ZoomButtons
};

const requires = {};

module.exports = { plugins, requires };
