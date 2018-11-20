import {
  DAG_UPLOAD_IMAGE,
  DAG_UPLOAD_IMAGE_SUCCESS,
  DAG_UPLOAD_IMAGE_FAILED
} from "../actionTypes/designAndGo";
import axios from "axios";

const { Observable } = require("rxjs");
const { mapTo, map, mergeMap } = require("rxjs/operators");
const { ofType } = require("redux-observable");

const URL = "http://work.cloudlab.at:9012/ig/designAndGoUpload/upload.php";

module.exports = {
  onEpicDesignAngGo: (action$, state$) =>
    action$.pipe(
      ofType(DAG_UPLOAD_IMAGE),
      mergeMap(action$ =>
        Observable.create(obs => {
          let serverData = new FormData();
          serverData.append("fileToUpload", action$.payload.image);
          axios
            .post(URL, serverData)
            .then(resp => resp.data)
            .then(data => {
              if (data.status !== "failure") {
                obs.next({
                  type: DAG_UPLOAD_IMAGE_SUCCESS,
                  payload: data.file_path
                });
              } else {
                obs.next({
                  type: DAG_UPLOAD_IMAGE_FAILED,
                  payload: data.error_message
                });
              }
              obs.complete();
            })
            .catch(error => {
              console.log(error, "ERROR");
              obs.next({
                type: DAG_UPLOAD_IMAGE_FAILED,
                payload: "Error message: " + error.message
              });
              obs.complete();
            });
        })
      )
    )
};
