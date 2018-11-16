const { pathOr } = require("ramda");

const searchValueSelector = state =>
  pathOr(null, ["fupa", "searchValue"], state);
const clubsStateSelector = state => pathOr(null, ["fupa", "clubsState"], state);
const currentClubSelector = state =>
  pathOr(null, ["fupa", "currentClub"], state);
const clubTeamsSelector = state =>
  pathOr(null, ["fupa", "clubTeamsState"], state);
const currentTeamSelector = state =>
  pathOr(null, ["fupa", "currentTeam"], state);
const clubsSelector = state =>
  pathOr(null, ["fupa", "clubsState", "clubs"], state);
const teamsSelector = state =>
  pathOr(null, ["fupa", "clubTeamsState", "teams"], state);

module.exports = {
  searchValueSelector,
  clubsStateSelector,
  currentClubSelector,
  clubTeamsSelector,
  currentTeamSelector,
  clubsSelector,
  teamsSelector
};
