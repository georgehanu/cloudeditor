const {} = require("../actionTypes/variables");

const { handleActions, combineActions } = require("redux-actions");
const ProjectUtils = require("../../utils/ProjectUtils");
const initialState = ProjectUtils.getEmptyVariables();

module.exports = handleActions({}, initialState);
