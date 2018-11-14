const { CHANGE_PAGE } = require("../actionTypes/pagination");
const changePage = (state, payload) => {};
const { handleActions } = require("redux-actions");
const initialState = {
  pages: {}
};
module.exports = handleActions(
  {
    [CHANGE_PAGE]: (state, action) => {
      return changePage(state, action.payload);
    }
  },
  initialState
);
