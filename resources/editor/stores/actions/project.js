const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  AFTER_OBJECT_MOVED,
  UPDATE_SELECTION_OBJECTS_COORDS
} = require("../actionTypes/project");
const { createActions } = require("redux-actions");

const {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  addObjectIdToSelected,
  removeSelection,
  afterObjectMoved,
  updateSelectionObjectsCoords
} = createActions(
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  AFTER_OBJECT_MOVED,
  UPDATE_SELECTION_OBJECTS_COORDS
);

module.exports = {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  addObjectIdToSelected,
  removeSelection,
  afterObjectMoved,
  updateSelectionObjectsCoords
};
