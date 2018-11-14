const React = require("react");
const { connect } = require("react-redux");
const ClubsSearch = require("./components/ClubsSearch/ClubsSearch");
const ClubSelection = require("./components/ClubSelection/ClubSelection");
const {
  clubsStateSelector,
  currentClubSelector
} = require("./store/selectors");
const { changeCurrentClub } = require("./store/actions");
require("./Fupa.css");

class FupaBuilder extends React.Component {
  render() {
    return (
      <div className="fupa">
        <ClubsSearch />
        <ClubSelection
          clubs={this.props.clubsState.clubs}
          loading={this.props.clubsState.loading}
          error={this.props.clubsState.error}
          limit={15}
          selected={this.props.selectClub}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    clubsState: clubsStateSelector(state),
    currentClub: currentClubSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectClub: value => dispatch(changeCurrentClub(value))
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(FupaBuilder);
