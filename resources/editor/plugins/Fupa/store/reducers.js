const actionTypes = require("./actionTypes");
const { updateObject } = require("../../../utils/UtilUtils");

const { handleActions } = require("redux-actions");
const initialState = {
  searchValue: null,
  clubsState: {
    error: null,
    loading: false,
    clubs: []
  },
  currentClub: {},
  clubTeamsState: {
    error: null,
    loading: false,
    teams: []
  },
  currentTeam: {},
  currentTeamState: {
    error: null,
    loading: false
  }
};

const changeSearchValue = (state, value) => {
  const updatedState = {
    searchValue: value,
    currentClub: {},
    currentTeam: {}
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

const changeCurrentClub = (state, club) => {
  return {
    ...state,
    currentClub: club,
    clubTeamsState: {
      ...state.clubTeamsState,
      loading: true,
      error: null,
      teams: []
    }
  };
};

const updateClubTeams = (state, teams) => {
  return {
    ...state,
    clubTeamsState: {
      ...state.clubTeamsState,
      loading: false,
      error: null,
      teams: teams
    }
  };
};

const failUpdateClubTeams = (state, error) => {
  return {
    ...state,
    clubTeamsState: {
      ...state.clubTeamsState,
      loading: false,
      error: error,
      teams: []
    }
  };
};

const changeCurrentTeam = (state, team) => {
  return state;
};

const backToSearch = state => {
  return {
    ...state,
    currentClub: {},
    clubTeamsState: {
      ...state.clubTeamsState,
      loading: false,
      error: null,
      teams: []
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
    },
    [actionTypes.FETCH_CLUB_TEAMS_FULFILLED]: (state, action) => {
      console.log("FETCH_CLUB_TEAMS_FULFILLED", action);
      return updateClubTeams(state, action.payload);
    },
    [actionTypes.FETCH_CLUB_TEAMS_FAILED]: (state, action) => {
      console.log("FETCH_CLUB_TEAMS_FAILED", action);
      return failUpdateClubTeams(state, action.payload);
    },
    [actionTypes.SELECT_CLUB_TEAM]: (state, action) => {
      console.log("SELECT_CLUB_TEAM", action);
      return selectClubTeam(state, action.payload);
    },
    [actionTypes.BACK_TO_SEARCH]: (state, action) => {
      console.log("BACK_TO_SEARCH", action);
      return backToSearch(state);
    }
  },
  initialState
);
