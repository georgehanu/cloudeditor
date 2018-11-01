const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  CHANGE_OBJECT_POSITION,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  UPDATE_OBJECT_PROPS,
  CHANGE_OBJECT_DIMENSIONS
} = require("../actionTypes/project");
const { createActions } = require("redux-actions");

const {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  changeObjectPosition,
  changeObjectDimensions,
  addObjectIdToSelected,
  removeSelection,
  updateObjectProps
} = createActions(
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  CHANGE_OBJECT_POSITION,
  CHANGE_OBJECT_DIMENSIONS,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  UPDATE_OBJECT_PROPS
);

module.exports = {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  changeObjectPosition,
  changeObjectDimensions,
  removeSelection,
  addObjectIdToSelected,
  updateObjectProps
};
