const actionTypes = require("./actionTypes");
const { updateObject } = require("../../../utils/UtilUtils");

const { handleActions } = require("redux-actions");
const initialState = {
  searchValue: null,
  clubsState: {
    error: null,
    loading: false,
    currentClub: null,
    clubs: []
  },
  teamsState: {
    error: null,
    loading: false,
    currentTeam: null,
    teams: []
  }
};

const changeSearchValue = (state, value) => {
  const updatedState = {
    searchValue: value
  };
  return updateObject(state, updatedState);
};

const fetchClubs = state => {
  return {
    ...state,
    clubsState: {
      ...state.clubsState,
      loading: true,
      error: ""
    }
  };
};

const updateClubs = (state, clubs) => {
  return {
    ...state,
    clubsState: {
      ...state.clubsState,
      loading: false,
      error: null,
      clubs: clubs
    }
  };
};

const failUpdateClubs = (state, error) => {
  return {
    ...state,
    clubsState: {
      ...state.clubsState,
      loading: false,
      error: error,
      clubs: []
    }
  };
};

const changeCurrentClub = (state, clubId) => {
  return {
    ...state,
    clubsState: {
      ...state.clubsState,
      currentClub: clubId
    }
  };
};

module.exports = handleActions(
  {
    [actionTypes.CHANGE_SEARCH_VALUE]: (state, action) => {
      return changeSearchValue(state, action.payload);
    },
    [actionTypes.FETCH_CLUBS]: (state, action) => {
      console.log("FETCH_CLUBS", action);
      return fetchClubs(state);
    },
    [actionTypes.FETCH_CLUBS_FULFILLED]: (state, action) => {
      console.log("FETCH_CLUBS_FULFILLED", action);
      return updateClubs(state, action.payload);
    },
    [actionTypes.FETCH_CLUBS_FAILED]: (state, action) => {
      console.log("FETCH_CLUBS_FAILED", action);
      return failUpdateClubs(state, []);
    },
    [actionTypes.CHANGE_CURRENT_CLUB]: (state, action) => {
      console.log("CHANGE_CURRENT_CLUB", action);
      return changeCurrentClub(state, action.payload);
    }
  },
  initialState
);
