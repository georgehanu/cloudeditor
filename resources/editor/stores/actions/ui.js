const { UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET } = require("../actionTypes/ui");
const { createActions } = require("redux-actions");

const { uiUpdateWorkAreaOffsetPageOfsset } = createActions(
  UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET
);

module.exports = {
  uiUpdateWorkAreaOffsetPageOfsset
};
