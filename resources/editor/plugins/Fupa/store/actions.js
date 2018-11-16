const { createActions } = require("redux-actions");
const actionTypes = require("./actionTypes");

const actionCreators = createActions(
  actionTypes.CHANGE_SEARCH_VALUE,
  actionTypes.FETCH_CLUBS,
  actionTypes.FETCH_CLUBS_FULFILLED,
  actionTypes.FETCH_CLUBS_FAILED,
  actionTypes.CHANGE_CURRENT_CLUB,
  actionTypes.FETCH_CLUB_TEAMS_FULFILLED,
  actionTypes.FETCH_CLUB_TEAMS_FAILED,
  actionTypes.SELECT_CLUB_TEAM,
  actionTypes.BACK_TO_SEARCH
);

module.exports = actionCreators;
