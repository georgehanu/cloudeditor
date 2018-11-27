const { createActions } = require("redux-actions");
const actionTypes = require("./actionTypes");

const actionCreators = createActions(actionTypes.CHECK_TEXT_SIZE);

module.exports = actionCreators;
