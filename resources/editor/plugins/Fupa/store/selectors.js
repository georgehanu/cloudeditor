const { pathOr } = require("ramda");

const searchValueSelector = state =>
  pathOr(null, ["fupa", "searchValue"], state);
const clubsStateSelector = state => pathOr(null, ["fupa", "clubsState"], state);
const teamsStateSelector = state => pathOr(null, ["fupa", "teamsState"], state);
const clubsSelector = state =>
  pathOr(null, ["fupa", "clubsState", "clubs"], state);
const teamsSelector = state =>
  pathOr(null, ["fupa", "teamsState", "teams"], state);
const currentClubSelector = state =>
  pathOr(null, ["fupa", "clubsState", "currentClub"], state);
const currentTeamSelector = state =>
  pathOr(null, ["fupa", "teamsState", "currentTeam"], state);

module.exports = {
  searchValueSelector,
  clubsStateSelector,
  teamsStateSelector,
  clubsSelector,
  teamsSelector,
  currentClubSelector,
  currentTeamSelector
};
