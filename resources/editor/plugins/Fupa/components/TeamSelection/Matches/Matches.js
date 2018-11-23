import React from "react";
import { withNamespaces } from "react-i18next";

import "./Matches.css";

const games = [
  {
    fupatv: false,
    gallery: false,
    guestGoal: 2,
    guestTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "fc-bayern-muenchen",
      id: 568319,
      image: {
        baseName: "ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/fc-bayern-muenchen/team/m1",
      name: {
        full: "FC Bayern München",
        middle: "FC Bayern"
      },
      origin: ""
    },
    homeGoal: 3,
    homeTeam: {
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
    id: 6381481,
    kickoff: "2018-11-10T18:30:00+01:00",
    linkUrl:
      "https://www.fupa.net/spielberichte/borussia-dortmund-fc-bayern-muenchen-6381481.html",
    matchDayNumber: 11,
    number: 11,
    referee: {
      club: {
        id: 10807,
        image: {
          baseName: "KP3Naq12PudKhNtiXAnKZ8dq3RdIR1clI6UvzJrN",
          basePath: "https://cdn.fupa.net/club/",
          description: null,
          source: null,
          svg: false
        },
        linkUrl: "https://www.fupa.net/club/fc-hertha-03-zehlendorf",
        middleName: "FC Hertha 03",
        name: "FC Hertha 03 Zehlendorf",
        slug: "fc-hertha-03-zehlendorf"
      },
      image: {
        baseName: "ZLOv9pbSuYr6Ai3pON24sqnZw3WeoVx5XmDHwrC1",
        basePath: "https://cdn.fupa.net/referee/",
        description: null,
        source: "Getty Images",
        svg: false
      },
      linkUrl: "https://www.fupa.net/schiri/manuel-graefe-1317.html",
      name: "Manuel Gräfe",
      slug: "manuel-graefe-1317"
    },
    resultAfter: "regular",
    section: "POST",
    slug: null,
    status: null,
    tickerLive: true,
    verdict: null
  },
  {
    fupatv: false,
    gallery: false,
    guestGoal: null,
    guestTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "fortuna-duesseldorf",
      id: 568343,
      image: {
        baseName: "uDAkEGyzRuvlsiiTOKf9hYNEs4cabNCAGcyQXfZJ",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/fortuna-duesseldorf/team/m1",
      name: {
        full: "Fortuna Düsseldorf",
        middle: "F. Düsseld."
      },
      origin: "up"
    },
    homeGoal: null,
    homeTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "fc-bayern-muenchen",
      id: 568319,
      image: {
        baseName: "ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/fc-bayern-muenchen/team/m1",
      name: {
        full: "FC Bayern München",
        middle: "FC Bayern"
      },
      origin: ""
    },
    id: 6381492,
    kickoff: "2018-11-24T15:30:00+01:00",
    linkUrl:
      "https://www.fupa.net/spielberichte/fc-bayern-muenchen-fortuna-duesseldorf-6381492.html",
    matchDayNumber: 12,
    number: 12,
    referee: null,
    resultAfter: "regular",
    section: "PRE",
    slug: null,
    status: null,
    tickerLive: true,
    verdict: null
  },
  {
    fupatv: false,
    gallery: false,
    guestGoal: null,
    guestPlaceholder: null,
    guestTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "benfica-lissabon",
      id: 629076,
      image: {
        baseName: "vuqEu37tofEhd3M5FrsnglSDWU1UP3yrQBhqu4hN",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: false
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/benfica-lissabon/team/m1",
      name: {
        full: "Benfica Lissabon",
        middle: "Benfica"
      },
      origin: ""
    },
    homeGoal: null,
    homePlaceholder: null,
    homeTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "fc-bayern-muenchen",
      id: 568319,
      image: {
        baseName: "ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/fc-bayern-muenchen/team/m1",
      name: {
        full: "FC Bayern München",
        middle: "FC Bayern"
      },
      origin: ""
    },
    id: 7137891,
    kickoff: "2018-11-27T21:00:00+01:00",
    linkUrl:
      "https://www.fupa.net/spielberichte/fc-bayern-muenchen-benfica-lissabon-7137891.html",
    matchDay: {
      id: 1071956,
      number: 0
    },
    matchDayNumber: 0,
    referee: null,
    resultAfter: "regular",
    section: "PRE",
    slug: "fc-bayern-muenchen-m1-benfica-lissabon-m1-181127",
    status: null,
    tickerLive: true,
    tournamentGroup: "E",
    tournamentPhase: 35199,
    verdict: null
  },
  {
    fupatv: false,
    gallery: false,
    guestGoal: null,
    guestTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "fc-bayern-muenchen",
      id: 568319,
      image: {
        baseName: "ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/fc-bayern-muenchen/team/m1",
      name: {
        full: "FC Bayern München",
        middle: "FC Bayern"
      },
      origin: ""
    },
    homeGoal: null,
    homeTeam: {
      ageGroup: {
        name: "Herren",
        slug: "m"
      },
      clubSlug: "sv-werder-bremen",
      id: 568321,
      image: {
        baseName: "gnmIdkGSoYYVejdSwx3MLTQVIFR6UwaoNMjDFEx9",
        basePath: "https://cdn.fupa.net/club/",
        description: null,
        source: null,
        svg: true
      },
      level: 1,
      linkUrl: "https://www.fupa.net/club/sv-werder-bremen/team/m1",
      name: {
        full: "SV Werder Bremen",
        middle: "Werder"
      },
      origin: ""
    },
    id: 6381507,
    kickoff: "2018-12-01T15:30:00+01:00",
    linkUrl:
      "https://www.fupa.net/spielberichte/sv-werder-bremen-fc-bayern-muenchen-6381507.html",
    matchDayNumber: 13,
    number: 13,
    referee: null,
    resultAfter: "regular",
    section: "PRE",
    slug: null,
    status: null,
    tickerLive: true,
    verdict: null
  }
];

const scoreCard = {
  color: "#212121",
  fontSize: "14px",
  position: "relative",
  textAlign: "center",
  width: "60px",
  fontWeight: "normal !important",
  backgroundColor: "#3bba27",
  height: "24px"
};
const Matches = props => {
  const teamId = 568319;
  const matches = games.map((el, index) => {
    let oponentTeam = null;
    let location = null;
    let matchDay =
      el.matchDayNumber === 0 ? props.t("NA") : el.matchDayNumber + ".";
    if (el.guestTeam.id === teamId) {
      oponentTeam = el.homeTeam;
      location = props.t("AWAY");
    } else {
      oponentTeam = el.guestTeam;
      location = props.t("HOME");
    }

    let matchInfo = null;
    if (el.section === "PRE") {
      // match did not happen yet, we have to display the date
      const date = new Date(el.kickoff);
      console.log(el.kickoff);
      console.log(date);
      console.log(date.getDate());
      console.log(date.getMonth());
      const dateStr = date.getDate() + "." + (1 + date.getMonth());
      matchInfo = (
        <div
          class="liga_spieltag_vorschau_datum_content_ergebnis"
          style={{ lineHeight: "24px" }}
        >
          <span
            class="liga_spieltag_vorschau_datum_content_ergebnis_heim"
            style={{ color: "#fff" }}
          >
            {dateStr}
          </span>
        </div>
      );
    } else if (el.section === "POST") {
      // display the score
      matchInfo = (
        <div
          class="liga_spieltag_vorschau_datum_content_ergebnis"
          style={{ lineHeight: "24px" }}
        >
          <span
            class="liga_spieltag_vorschau_datum_content_ergebnis_heim"
            style={{ color: "#fff" }}
          >
            {el.homeGoal}
          </span>
          <span
            class="liga_spieltag_vorschau_datum_content_ergebnis_doppelpunkt"
            style={{ color: "#fff" }}
          >
            :
          </span>
          <span
            class="liga_spieltag_vorschau_datum_content_ergebnis_gast"
            style={{ color: "#fff" }}
          >
            {el.guestGoal}
          </span>
        </div>
      );
    }
    return (
      <tr key={index}>
        <td class="aktspiele_spieltagsnr">{matchDay}</td>
        <td class="aktspiele_datum">Sa., 27.10.</td>
        <td class="aktspiele_spieltag">{location}</td>
        <td align="left" class="aktspiele_gegner_mobil">
          {oponentTeam.name.middle}
        </td>
        <td>&nbsp;</td>
        <td>
          <div
            class="liga_spieltag_vorschau_spiel team_spielplan_erg_sieg "
            style={{ ...scoreCard }}
          >
            <div
              class="liga_spieltag_vorschau_wochentag"
              style={{ display: "none" }}
            >
              <div>Sa.</div>
            </div>
            <div
              class="liga_spieltag_vorschau_heim"
              style={{ display: "none" }}
            >
              <div class="liga_spieltag_vorschau_heim_content">Mainz 05</div>
              <div
                class="img-cdn-wrapper team "
                style={{ width: "25px", height: "25px" }}
              >
                <picture>
                  <source srcset="https://cdn.fupa.net/club/svg/zRtdyWQqfHWTws0IX5YNAyMoTaJXPJkvb0jAIuIO 1x, https://cdn.fupa.net/club/svg/zRtdyWQqfHWTws0IX5YNAyMoTaJXPJkvb0jAIuIO 2x" />
                  <img
                    src="https://cdn.fupa.net/club/svg/zRtdyWQqfHWTws0IX5YNAyMoTaJXPJkvb0jAIuIO"
                    title="FSV Mainz 05"
                    alt="FSV Mainz 05"
                  />
                </picture>
              </div>
            </div>
            <div
              class="liga_spieltag_vorschau_datum  "
              style={{ display: "inline-block" }}
            >
              {matchInfo}
            </div>

            <div
              class="liga_spieltag_vorschau_gast"
              style={{ display: "none" }}
            >
              <div
                class="img-cdn-wrapper team "
                style={{ width: "25px", height: "25px" }}
              >
                <picture>
                  <source srcset="https://cdn.fupa.net/club/svg/ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM 1x, https://cdn.fupa.net/club/svg/ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM 2x" />
                  <img
                    src="https://cdn.fupa.net/club/svg/ruCXTmrflAB9BiwYkv2NZOfzPzfvT9vv7ntHZqVM"
                    title="FC Bayern München"
                    alt="FC Bayern München"
                  />
                </picture>
              </div>
              <div class="liga_spieltag_vorschau_gast_content">FC Bayern</div>
            </div>
            <div class="liga_spieltag_vorschau_zusatz" />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="Matches">
      <table class="team_modul_aktuelle_spiele">
        <tbody>
          <tr>
            <th colspan="6" class="top_header_big">
              <span class="schlagwort">Aktuelle</span> Spiele
            </th>
          </tr>

          {matches}
        </tbody>
      </table>
    </div>
  );
};

export default withNamespaces("fupa")(Matches);
