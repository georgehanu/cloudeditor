const { append } = require("ramda");
const ProjectUtils = require("../../utils/ProjectUtils");
const ConfigUtils = require("../../utils/ConfigUtils");
const { handleActions } = require("redux-actions");

const config = ConfigUtils.getDefaults();
const emptyUi = ProjectUtils.getRandomUI(config.project);
const {
  UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET,
  UI_UPDATE_CONTAINER_CANVAS_OFFSET,
  UI_UPDATE_VIEWPORT_TRANSFORM,
  UPDATE_ZOOM
} = require("../actionTypes/ui");
const initialState = {
  ...emptyUi
};

module.exports = handleActions(
  {
    [UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET]: (state, action) => {
      let workArea = state.workArea;
      workArea = {
        ...workArea,
        pageOffset: action.payload.workArea,
        scale: action.payload.scale,
        canvas: action.payload.canvas
      };
      return { ...state, workArea: workArea };
    },
    [UI_UPDATE_CONTAINER_CANVAS_OFFSET]: (state, action) => {
      let workArea = state.workArea;
      workArea = {
        ...workArea,
        offsetCanvasContainer: action.payload
      };
      return { ...state, workArea: workArea };
    },
    [UI_UPDATE_VIEWPORT_TRANSFORM]: (state, action) => {
      let workArea = state.workArea;
      workArea = { ...workArea, viewportTransform: action.payload };
      return { ...state, workArea: workArea };
    },
    [UPDATE_ZOOM]: (state, action) => {
      let workArea = state.workArea;
      workArea = {
        ...workArea,
        zoom: action.payload.zoom,
        viewportTransform: action.payload.viewportTransform
      };
      return { ...state, workArea: workArea };
    }
  },
  initialState
);
