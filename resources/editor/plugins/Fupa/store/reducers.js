const actionTypes = require("./actionTypes");
const { updateObject } = require("../../../utils/UtilUtils");

const { handleActions } = require("redux-actions");
const initialState = {
  searchValue: null,
  clubs: [],
  teams: [],
  currentClub: null,
  currentTeam: null,
  teamStandings: [],
  clubsState: {
    error: false,
    loading: false
  },
  teamsState: {
    error: false,
    loading: false
  },
  teamStandingsState: {
    error: false,
    loading: false
  }
};

const changeSearchValue = (state, value) => {
  const updatedState = {
    searchValue: value,
    currentClub: null,
    currentTeam: null,
    clubs: [],
    teams: []
  };
  return updateObject(state, updatedState);
};

const fetchClubs = state => {
  return {
    ...state,
    clubs: [],
    clubsState: {
      ...state.clubsState,
      loading: true,
      error: false
    }
  };
};

const updateClubs = (state, clubs) => {
  return {
    ...state,
    clubs: clubs,
    clubsState: {
      ...state.clubsState,
      loading: false,
      error: false
    }
  };
};

const failUpdateClubs = state => {
  return {
    ...state,
    clubs: [],
    clubsState: {
      ...state.clubsState,
      loading: false,
      error: true
    }
  };
};

const changeCurrentClub = (state, club) => {
  return {
    ...state,
    currentClub: club || [],
    teams: [],
    teamsState: {
      ...state.teamsState,
      loading: true,
      error: false
    }
  };
};

const updateClubTeams = (state, teams) => {
  return {
    ...state,
    teams: teams || [],
    teamsState: {
      ...state.teamsState,
      loading: false,
      error: false
    }
  };
};

const failUpdateClubTeams = state => {
  return {
    ...state,
    teams: [],
    teamsState: {
      ...state.teamsState,
      loading: false,
      error: true
    }
  };
};

const changeCurrentTeam = (state, team) => {
  return {
    ...state,
    currentTeam: team || [],
    teamStandingsState: {
      ...state.teamStandingsState,
      loading: true
    }
  };
};

const backToSearch = state => {
  return {
    ...state,
    currentClub: null,
    teams: [],
    clubTeamsState: {
      ...state.clubTeamsState,
      loading: false,
      error: false
    }
  };
};

const teamCompetitionFulfilled = (state, standings) => {
  return {
    ...state,
    teamStandings: standings,
    teamStandingsState: {
      ...state.teamStandingsState,
      loading: false,
      error: false
    }
  };
};

const teamCompetitionFailed = state => {
  return {
    ...state,
    teamStandings: [],
    teamStandingsState: {
      ...state.standingsState,
      loading: false,
      error: true
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
      return failUpdateClubs(state);
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
      return failUpdateClubTeams(state);
    },
    [actionTypes.CHANGE_CURRENT_TEAM]: (state, action) => {
      console.log("CHANGE_CURRENT_TEAM", action);
      return changeCurrentTeam(state, action.payload.team);
    },
    [actionTypes.BACK_TO_SEARCH]: (state, action) => {
      console.log("BACK_TO_SEARCH", action);
      return backToSearch(state);
    },
    [actionTypes.FETCH_TEAM_COMPETITION_FULFILLED]: (state, action) => {
      return teamCompetitionFulfilled(state, action.payload);
    },
    [actionTypes.FETCH_TEAM_COMPETITION_FAILED]: state => {
      return teamCompetitionFailed(state);
    }
  },
  initialState
);
