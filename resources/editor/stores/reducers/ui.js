const { CHANGE_ZOOM } = require("../actionTypes/ui");

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
module.exports = handleActions(
  {
    [CHANGE_ZOOM]: (state, action) => {
      return changeZoom(state, action.payload);
    }
  },
  initialState
);
