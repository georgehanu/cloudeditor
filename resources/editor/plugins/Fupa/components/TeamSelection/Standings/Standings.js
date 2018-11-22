import React from "react";
import { withNamespaces } from "react-i18next";

const jsonStanding = [
  {
    againstGoals: 12,
    defeats: 0,
    draws: 3,
    goalDifference: 21,
    mark: "up1",
    matchDay: {
      id: 1014109,
      number: 34
    },
    matches: 11,
    ownGoals: 33,
    points: 27,
    rank: 1,
    team: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "borussia-dortmund",
      id: 568324,
      image: {
        baseName: "EcfYhoKUkDSKQD0FjqosyLgAq1UCmkjWiap2B36K",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/borussia-dortmund/team/m1",
      name: {
        full: "Borussia Dortmund",
        middle: "Dortmund"
      },
      origin: ""
    },
    wins: 8
  },
  {
    againstGoals: 13,
    defeats: 2,
    draws: 2,
    goalDifference: 13,
    mark: "up2",
    matchDay: {
      id: 1014109,
      number: 34
    },
    matches: 11,
    ownGoals: 26,
    points: 23,
    rank: 2,
    team: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "borussia-moenchengladbach",
      id: 568331,
      image: {
        baseName: "HcuHdKI57sCX9RZa4KtVRvTMrE02qwV04cSt7CSc",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/borussia-moenchengladbach/team/m1",
      name: {
        full: "Borussia Mönchengladbach",
        middle: "Borussia MG"
      },
      origin: ""
    },
    wins: 7
  },
  {
    againstGoals: 9,
    defeats: 1,
    draws: 4,
    goalDifference: 13,
    mark: "up2",
    matchDay: {
      id: 1014109,
      number: 34
    },
    matches: 11,
    ownGoals: 22,
    points: 22,
    rank: 3,
    team: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "rb-leipzig",
      id: 568336,
      image: {
        baseName: "X0ooU4MvYX1dYNRLPa3y7tJ61To66Ok8UvAwnpHS",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: false
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/rb-leipzig/team/m1",
      name: {
        full: "RB Leipzig",
        middle: "RB Leipzig"
      },
      origin: ""
    },
    wins: 6
  }
];

const Standings = props => {
  const teams = jsonStanding.map((el, index) => {
    return (
      <tr className="tabelle_farbe_neutral">
        <td
          width="20"
          className="tabelle_nummer "
          style={{ paddingLeft: "2px", fontWeight: "bold" }}
        >
          {el.rank}.
        </td>
        <td
          width="12"
          style={{ textAlign: "left", paddingLeft: "0px" }}
          className="aufab tab_aufab"
          title="-1"
        >
          <div
            style={{ color: "#bfbfbf" }}
            className="fupa-icon-arrow486 font-icon icon "
          />
        </td>
        <td width="25" className="tab_wappen" style={{ textAlign: "right" }}>
          <div>
            <a href={el.linkUrl}>
              <div
                className="img-cdn-wrapper team "
                style={{ width: "25px", height: "25px" }}
              >
                <picture>
                  <source srcset="https://cdn.fupa.net/club/svg/gnmIdkGSoYYVejdSwx3MLTQVIFR6UwaoNMjDFEx9 1x, https://cdn.fupa.net/club/svg/gnmIdkGSoYYVejdSwx3MLTQVIFR6UwaoNMjDFEx9 2x" />
                  <img
                    src="https://cdn.fupa.net/club/svg/gnmIdkGSoYYVejdSwx3MLTQVIFR6UwaoNMjDFEx9"
                    title={el.team.name.full}
                    alt={el.team.name.full}
                  />
                </picture>
              </div>
            </a>
          </div>
        </td>

        <td
          align="left"
          style={{ paddingLeft: "2px" }}
          className="tab_team_name"
        >
          <a href={el.linkUrl}>{el.team.name.full}</a>{" "}
        </td>

        <td
          style={{ textAlign: "center" }}
          className="tabelle_nummer tab_games"
        >
          {el.matches}
        </td>

        <td className="tabelle_nummer tab_diff">{el.goalDifference}</td>

        <td
          className="tabelle_nummer tab_points"
          style={{ width: "25px", paddingLeft: "2px" }}
        >
          <strong>{el.points}</strong>
        </td>
      </tr>
    );
  });
  return (
    <div className="right_modul ">
      <table className="liga_tabelle ">
        <tbody>
          <tr>
            <th colSpan="11" className="top_header_big">
              <span className="schlagwort">{props.t("Standings")}</span>
            </th>
          </tr>
          {teams}
        </tbody>
      </table>
    </div>
  );
};

export default withNamespaces("fupa")(Standings);
