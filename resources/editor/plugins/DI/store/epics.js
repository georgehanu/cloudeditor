//https://fupa.docs.stoplight.io/api-docs-v1/club/get-one-club
const Rx = require("rxjs");
const { switchMap, catchError } = require("rxjs/operators");
const { ofType } = require("redux-observable");

const actionTypes = require("../../../stores/actionTypes/project");
const actions = require("./actions");

module.exports = {
  onTextChangeEpic: action$ =>
    action$.pipe(
      ofType(actionTypes.ON_TEXT_CHANGE),
      switchMap(action => {
        const result = Rx.of(actions.checkTextSize(action.payload));
        console.log("onTextChangeEpic123", action, result);
        return result;
      })
    )
};
