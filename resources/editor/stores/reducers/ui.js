const { append } = require("ramda");
const ProjectUtils = require("../../utils/ProjectUtils");
const ConfigUtils = require("../../utils/ConfigUtils");
const { handleActions } = require("redux-actions");

const config = ConfigUtils.getDefaults();
const emptyUi = ProjectUtils.getRandomUI(config.project);
const { UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET } = require("../actionTypes/ui");
const initialState = {
  ...emptyUi
};

module.exports = handleActions(
  {
    [UI_UPDATE_WORK_AREA_OFFSET_PAGE_OFSSET]: (state, action) => {
      return {
        ...state,
        workArea: action.payload.workArea,
        scale: action.payload.scale
      };
    }
  },
  initialState
);
