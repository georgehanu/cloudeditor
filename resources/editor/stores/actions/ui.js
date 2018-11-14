const {
  UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET,
  UI_UPDATE_CONTAINER_CANVAS_OFFSET
} = require("../actionTypes/ui");
const { createActions } = require("redux-actions");

const {
  uiUpdateWorkAreaOffsetPageOfsset,
  uiUpdateContainerCanvasOffset
} = createActions(
  UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET,
  UI_UPDATE_CONTAINER_CANVAS_OFFSET
);

module.exports = {
  uiUpdateWorkAreaOffsetPageOfsset,
  uiUpdateContainerCanvasOffset
};
