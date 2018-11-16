const React = require("react");
const { connect } = require("react-redux");
const { isEmpty } = require("ramda");
const ClubsSearch = require("./components/ClubsSearch/ClubsSearch");
const ClubSelection = require("./components/ClubSelection/ClubSelection");
const ClubTeams = require("./components/ClubTeams/ClubTeams");
const TeamSelection = require("./components/TeamSelection/TeamSelection");
const {
  clubsStateSelector,
  currentClubSelector,
  clubTeamsSelector,
  currentTeamSelector
} = require("./store/selectors");
const {
  changeCurrentClub,
  selectClubTeam,
  backToSearch
} = require("./store/actions");
require("./Fupa.css");

class FupaBuilder extends React.Component {
  render() {
    const { currentClub, clubsState, clubTeams, currentTeam } = this.props;
    return (
      <div className="fupa">
        <ClubsSearch />
        <ClubSelection
          clubs={clubsState.clubs}
          loading={clubsState.loading}
          error={clubsState.error}
          hide={!isEmpty(currentClub) || false}
          limit={15}
          selected={this.props.selectClub}
        />
        <ClubTeams
          club={currentClub}
          loading={clubTeams.loading}
          error={clubTeams.error}
          teams={clubTeams.teams}
          limit={99}
          backToSearch={this.props.backToSearch}
          selected={this.props.selectClubTeam}
        />
        <TeamSelection
          club={currentClub}
          teams={clubTeams.teams}
          team={currentTeam}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    clubsState: clubsStateSelector(state),
    currentClub: currentClubSelector(state),
    clubTeams: clubTeamsSelector(state),
    currentTeam: currentTeamSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectClub: value => dispatch(changeCurrentClub(value)),
    selectClubTeam: value => dispatch(selectClubTeam(value)),
    backToSearch: () => dispatch(backToSearch())
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(FupaBuilder);
