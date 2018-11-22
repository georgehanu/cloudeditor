const {
  CHANGE_ZOOM,
  CHANGE_WORKAREA_PROPS,
  UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET,
  UI_UPDATE_CONTAINER_CANVAS_OFFSET,
  UI_UPDATE_VIEWPORT_TRANSFORM,
  UPDATE_ZOOM
} = require("../actionTypes/ui");

const { handleActions, combineActions } = require("redux-actions");
const ProjectUtils = require("../../utils/ProjectUtils");
const initialState = ProjectUtils.getEmptyUI();
const changeZoom = (state, payload) => {
  return {
    ...state,
    workArea: {
      ...state.workArea,
      zoom: payload
    }
  };
};
const changeWorkAreaProps = (state, payload) => {
  return {
    ...state,
    workArea: {
      ...state.workArea,
      ...payload
    }
  };
};
module.exports = handleActions(
  {
    [CHANGE_ZOOM]: (state, action) => {
      return changeZoom(state, action.payload);
    },
    [CHANGE_WORKAREA_PROPS]: (state, action) => {
      return changeWorkAreaProps(state, action.payload);
    },
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
      workArea = {
        ...workArea,
        viewportTransform: action.payload
      };
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
