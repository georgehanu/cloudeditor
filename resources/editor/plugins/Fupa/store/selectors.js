const { pathOr } = require("ramda");

const searchValueSelector = state =>
  pathOr(null, ["fupa", "searchValue"], state);
const currentClubSelector = state =>
  pathOr(null, ["fupa", "currentClub"], state);
const currentTeamSelector = state =>
  pathOr(null, ["fupa", "currentTeam"], state);
const clubsSelector = state => pathOr(null, ["fupa", "clubs"], state);
const teamsSelector = state => pathOr(null, ["fupa", "teams"], state);
const clubsStateSelector = state => pathOr(null, ["fupa", "clubsState"], state);
const teamsStateSelector = state => pathOr(null, ["fupa", "teamsState"], state);

module.exports = {
  searchValueSelector,
  currentClubSelector,
  currentTeamSelector,
  clubsSelector,
  teamsSelector,
  clubsStateSelector,
  teamsStateSelector
};
