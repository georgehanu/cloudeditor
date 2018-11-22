import Standings from "./components/TeamSelection/Standings/Standings";

const React = require("react");
const { connect } = require("react-redux");
const { isEmpty, isNil, propEq, find, defaultTo, pipe } = require("ramda");
const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");
const ClubsSearch = require("./components/ClubsSearch/ClubsSearch");
const ClubSelection = require("./components/ClubSelection/ClubSelection");
const ClubTeams = require("./components/ClubTeams/ClubTeams");
const TeamSelection = require("./components/TeamSelection/TeamSelection");
const {
  currentClubSelector,
  currentTeamSelector,
  clubsSelector,
  teamsSelector,
  clubsStateSelector,
  teamsStateSelector
} = require("./store/selectors");
const {
  changeCurrentClub,
  changeCurrentTeam,
  backToSearch
} = require("./store/actions");
require("./Fupa.css");

class FupaBuilder extends React.Component {
  render() {
    const { clubSelection, clubTeams, teamSelection } = this.props;
    return (
      <div className="fupa">
        <Standings />
        <ClubsSearch />
        <ClubSelection
          {...clubSelection}
          limit={15}
          selected={this.props.selectClub}
        />
        <ClubTeams
          {...clubTeams}
          limit={99}
          backToSearch={this.props.backToSearch}
          selected={this.props.changeCurrentTeam}
        />
        <TeamSelection
          {...teamSelection}
          changed={this.props.changeCurrentTeam}
        />
      </div>
    );
  }
}

const clubSelector = createSelector(
  [clubsSelector, currentClubSelector],
  (clubs, clubId) => {
    if (isNil(clubId)) return {};
    return pipe(
      find(propEq("slug", clubId)),
      defaultTo({})
    )(clubs);
  }
);

const teamSelector = createSelector(
  [teamsSelector, currentTeamSelector],
  (teams, teamId) => {
    if (isNil(teamId)) return {};
    return pipe(
      find(propEq("id", teamId)),
      defaultTo({})
    )(teams);
  }
);

const clubSelectionSelector = createSelector(
  [clubsSelector, clubSelector, clubsStateSelector],
  (clubs, club, state) => {
    return {
      clubs,
      loading: state.loading || false,
      error: state.error || false,
      hide: !isEmpty(club)
    };
  }
);

const clubTeamsSelector = createSelector(
  [
    clubsSelector,
    clubSelector,
    teamsSelector,
    teamSelector,
    teamsStateSelector
  ],
  (clubs, club, teams, team, state) => {
    return {
      club,
      teams,
      loading: state.loading || false,
      error: state.error || false,
      hide: isEmpty(club) || !isEmpty(team)
    };
  }
);

const teamSelectionSelector = createSelector(
  [clubSelector, teamsSelector, teamSelector, teamsStateSelector],
  (club, teams, team, state) => {
    return {
      club,
      teams,
      team,
      loading: state.loading || false,
      error: state.error || false,
      hide: isEmpty(club) || isEmpty(team)
    };
  }
);

const mapStateToProps = state => {
  return {
    clubSelection: clubSelectionSelector(state),
    clubTeams: clubTeamsSelector(state),
    teamSelection: teamSelectionSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectClub: value => dispatch(changeCurrentClub(value)),
    changeCurrentTeam: value => dispatch(changeCurrentTeam(value)),
    backToSearch: () => dispatch(backToSearch())
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(FupaBuilder);
