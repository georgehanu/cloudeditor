import {
  DAG_UPLOAD_IMAGE,
  DAG_UPLOAD_IMAGE_SUCCESS,
  DAG_UPLOAD_IMAGE_FAILED
} from "../actionTypes/designAndGo";

import { handleActions } from "redux-actions";

const initialState = {
  loading: false,
  imagePath: null,
  errorMessage: null
};

module.exports = handleActions(
  {
    [DAG_UPLOAD_IMAGE]: (state, action) => {
      return {
        ...state,
        loading: true
      };
    },
    [DAG_UPLOAD_IMAGE_SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        imagePath: action.payload,
        errorMessage: null
      };
    },
    [DAG_UPLOAD_IMAGE_FAILED]: (state, action) => {
      return {
        ...state,
        loading: false,
        imagePath: null,
        errorMessage: action.payload
      };
    }
  },
  initialState
);
