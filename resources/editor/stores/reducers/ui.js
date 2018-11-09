const { append } = require("ramda");
const ProjectUtils = require("../../utils/ProjectUtils");
const ConfigUtils = require("../../utils/ConfigUtils");
const { handleActions } = require("redux-actions");

const config = ConfigUtils.getDefaults();
const emptyUi = ProjectUtils.getRandomUI(config.project);

const initialState = {
  ...emptyUi
};

module.exports = handleActions({}, initialState);
