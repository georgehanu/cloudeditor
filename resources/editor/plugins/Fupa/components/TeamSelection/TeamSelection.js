const React = require("react");
const { withNamespaces } = require("react-i18next");
const { isEmpty, filter, propEq, map, pipe, pathOr, slice } = require("ramda");
const { classes } = require("./TeamSelection.css");

const Spinner = require("../../UI/Spinner/Spinner");
const Error = require("../../UI/Error/Error");
const Back = require("../../UI/Back/Back");

const teamSelection = props => {
  const { t, tReady, club, teams, team, hide } = props;
  let component = null;

  if (!tReady) return null;
  if (hide) return null;

  const teamItem = item => {
    let teamName = null;
    const rawName = pathOr(t("N/A"), ["ageGroup", "name"], item);
    const ageSlug = pathOr(null, ["ageGroup", "slug"], item);
    const level = pathOr(1, ["level"], item);
    if (ageSlug === "m") {
      teamName = level + ". " + t("Mannschaft");
    } else {
      teamName = rawName + (level > 1 ? " (" + level + ".)" : "");
    }
    const selected = item.id === team.id;

    return (
      <option key={item.id} selected={selected} value={item.id}>
        {teamName}
      </option>
    );
  };

  const teamsList = pipe(
    slice(0, props.limit),
    map(teamItem)
  )(teams);

  component = (
    <div className="verein_teams_container">
      <div>
        {t("Club")}: <strong>{club.name}</strong>
      </div>
      <div>
        {t("Team")}:
        <select onChange={event => props.changed(Number(event.target.value))}>
          {teamsList}
        </select>
        <select />
      </div>
    </div>
  );
  return component;
};

module.exports = withNamespaces("fupa")(teamSelection);