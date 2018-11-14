const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");

const {
  pick,
  merge,
  forEachObjIndexed,
  pipe,
  assocPath,
  assoc,
  values,
  head,
  keys
} = require("ramda");

const pagesSelector = state =>
  (state && state.project && state.project.pages) || {};
const objectsSelector = state =>
  (state && state.project && state.project.objects) || {};
const activePageIdSelector = state =>
  (state && state.project && state.project.activePage) || null;

const selectedObjectsIdsSelector = state =>
  (state && state.project && state.project.selectedObjectsIds) || [];

const selectedActionsIdsSelector = state =>
  (state && state.project && state.project.selectedActionObjectsIds) || [];

const activeSelectionSelector = state =>
  (state && state.project && state.project.activeSelection) || null;

const activePageSelector = createSelector(
  [
    pagesSelector,
    objectsSelector,
    activePageIdSelector,
    selectedObjectsIdsSelector,
    selectedActionsIdsSelector
  ],
  (pages, objects, pageId, selectedObejectsIds, selectedObjectsAction) => {
    let getObjectsInGroup = (pageObjectsIds, allObjects) => {
      let result = {};
      result = pick(pageObjectsIds, allObjects);

      forEachObjIndexed(obj => {
        if (obj.type == "group") {
          obj._elements = getObjectsInGroup(obj._objectsIds, allObjects);
        }
      }, result);
      return result;
    };
    const page = pages[pageId];
    let pageObjects = {};
    //getAlsoGroupObjects

    let activeObject = pick(selectedObejectsIds, objects);
    const activeObjectKey = pipe(
      keys,
      head
    )(activeObject);
    activeObject = assocPath([activeObjectKey, "active"], true, activeObject);
    objects = merge(objects, activeObject);
    let selecteObject = pick(selectedObjectsAction, objects);
    const selectedObjectKey = pipe(
      keys,
      head
    )(selecteObject);
    selecteObject = assocPath(
      [selectedObjectKey, "selected"],
      true,
      selecteObject
    );

    objects = merge(objects, selecteObject);

    pageObjects = merge(
      pageObjects,
      getObjectsInGroup(page.objectsIds, objects)
    );
    const activePage = {
      id: page.id,
      width: page.width,
      height: page.height,
      objects: pageObjects,
      background: page.background
    };

    return activePage;
  }
);
const selectedObjectSelector = createSelector(
  [objectsSelector, selectedObjectsIdsSelector],
  (objects, selectedObjectsIds) => {
    selectedObjectsIds = [Object.keys(objects)[0]];

    const activeObjects = {
      objects: pick(selectedObjectsIds, objects)
    };

    return activeObjects;
  }
);

module.exports = {
  activePageSelector,
  activePageIdSelector,
  selectedObjectSelector,
  activeSelectionSelector,
  objectsSelector,
  selectedActionsIdsSelector,
  selectedObjectsIdsSelector,
  pagesSelector
};
