const { CHANGE_PAGE } = require("../actionTypes/pagination");

const { createActions } = require("redux-actions");

const { changePage } = createActions(CHANGE_PAGE);

module.exports = { CHANGE_PAGE };
