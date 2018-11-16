const React = require("react");
const { withNamespaces } = require("react-i18next");
const { isEmpty, filter, propEq, map, pipe, pathOr, slice } = require("ramda");
const { classes } = require("./TeamSelection.css");

const Spinner = require("../../UI/Spinner/Spinner");
const Error = require("../../UI/Error/Error");
const Back = require("../../UI/Back/Back");

const teamSelection = props => {
  const { t, tReady, club, teams, team } = props;
  let component = null;

  if (!tReady) return null;
  if (isEmpty(club)) return null;
  if (isEmpty(team)) return null;
  if (props.error) {
    return <Error errorMsg={t("clubTeamsFail")} />;
  } else if (props.loading) {
    return <Spinner />;
  } else {
  }

  component = (
    <div className="verein_teams_container">
      <div>
        {t("Club")}: <strong>{club.name}</strong>
      </div>
      <div>{t("Team")}:</div>
    </div>
  );
  return component;
};

module.exports = withNamespaces("fupa")(teamSelection);
