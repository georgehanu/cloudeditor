const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  UPDATE_SELECTION_OBJECTS_COORDS,
  UPDATE_OBJECT_PROPS,
  UPDATE_CROP_PARAMS
} = require("../actionTypes/project");
const { createActions } = require("redux-actions");

const {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  addObjectIdToSelected,
  removeSelection,
  updateSelectionObjectsCoords,
  updateObjectProps,
  updateCropParams
} = createActions(
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  UPDATE_SELECTION_OBJECTS_COORDS,
  UPDATE_OBJECT_PROPS,
  UPDATE_CROP_PARAMS
);

module.exports = {
  changeProjectTitle,
  addObject,
  addObjectToPage,
  addObjectIdToSelected,
  removeSelection,
  updateSelectionObjectsCoords,
  updateObjectProps,
  updateCropParams
};
