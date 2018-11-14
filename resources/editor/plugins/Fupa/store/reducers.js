const actionTypes = require("./actionTypes");
const { updateObject } = require("../../../utils/UtilUtils");

const { handleActions } = require("redux-actions");
const initialState = {
  searchValue: null,
  clubs: [],
  teams: [],
  currentClub: null,
  currentTeam: null
};

const changeSearchValue = (state, value) => {
  const updatedState = {
    searchValue: value,
    clubs: [],
    teams: [],
    currentClub: null,
    currentTeam: null
  };
  return updateObject(state, updatedState);
};

const updateClubs = (state, clubs) => {
  return updateObject(state, clubs);
};

module.exports = handleActions(
  {
    [actionTypes.CHANGE_SEARCH_VALUE]: (state, action) => {
      return changeSearchValue(state, action.payload);
    },
    [actionTypes.FETCH_CLUBS]: (state, action) => {
      console.log("FETCH_CLUBS", action);
      return state;
    },
    [actionTypes.FETCH_CLUBS_FULFILLED]: (state, action) => {
      console.log("FETCH_CLUBS_FULFILLED", action);
      return updateClubs(state, action.payload);
    },
    [actionTypes.FETCH_CLUBS_FAILED]: (state, action) => {
      console.log("FETCH_CLUBS_FAILED", action);
      return updateClubs(state, []);
    }
  },
  initialState
);
