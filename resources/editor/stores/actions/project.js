const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  CHANGE_OBJECT_POSITION,
  CHANGE_OBJECT_DIMENSIONS
} = require("../actionTypes/project");
const { createActions } = require("redux-actions");

const {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  changeObjectPosition,
  changeObjectDimensions
} = createActions(
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  CHANGE_OBJECT_POSITION,
  CHANGE_OBJECT_DIMENSIONS
);

module.exports = {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  changeObjectPosition,
  changeObjectDimensions
};
