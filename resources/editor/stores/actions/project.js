const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,

  UPDATE_SELECTION_OBJECTS_COORDS,
  UPDATE_OBJECT_PROPS
} = require("../actionTypes/project");
const { createActions } = require("redux-actions");

const {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  addObjectIdToSelected,
  removeSelection,

  updateSelectionObjectsCoords,
  updateObjectProps
} = createActions(
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,

  UPDATE_SELECTION_OBJECTS_COORDS,
  UPDATE_OBJECT_PROPS
);

module.exports = {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  addObjectIdToSelected,
  removeSelection,

  updateSelectionObjectsCoords,
  updateObjectProps
};
