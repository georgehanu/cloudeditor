//https://fupa.docs.stoplight.io/api-docs-v1/club/get-one-club
const Rx = require("rxjs");
const { switchMap, catchError } = require("rxjs/operators");
const { ofType } = require("redux-observable");

const actionTypes = require("./actionTypes");
const actions = require("./actions");
const axios = require("../axios");

module.exports = {
  initSearchEpic: (action$, store) =>
    action$.pipe(
      ofType(actionTypes.CHANGE_SEARCH_VALUE),
      switchMap(action => {
        const { payload } = action;
        return Rx.of(actions.fetchClubs(payload));
      })
    ),
  fetchClubsEpic: action$ =>
    action$.pipe(
      ofType(actionTypes.FETCH_CLUBS),
      switchMap(action => {
        const { payload } = action;
        return Rx.from(
          axios.get("/search/club/" + payload).then(res => res.data)
        ).pipe(
          switchMap(data => {
            if (data.errors === false)
              return Rx.of(actions.fetchClubsFulfilled(data.data));
            return Rx.of(actions.fetchClubsFailed());
          }),
          catchError(error => {
            return Rx.of(actions.fetchClubsFailed());
          })
        );
      })
    ),
  fetchClubTeamsEpic: action$ =>
    action$.pipe(
      ofType(actionTypes.CHANGE_CURRENT_CLUB),
      switchMap(action => {
        const { payload } = action;
        return Rx.from(
          axios
            .get("/teams", {
              params: {
                club: payload,
                additionalFields: "competition,currentRank"
              }
            })
            .then(res => res.data)
        ).pipe(
          switchMap(data => {
            if (data.errors === false)
              return Rx.of(actions.fetchClubTeamsFulfilled(data.data));
            return Rx.of(actions.fetchClubTeamsFailed());
          }),
          catchError(error => {
            return Rx.of(actions.fetchClubTeamsFailed());
          })
        );
      })
    )
};
