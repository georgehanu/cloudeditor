const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");

const {
  pick,
  merge,
  forEachObjIndexed,
  pipe,
  assocPath,
  takeLast,
  values,
  head,
  keys,
  forEach
} = require("ramda");

const pagesSelector = state =>
  (state && state.project && state.project.pages) || {};
const groupsSelector = state =>
  (state &&
    state.project.configs &&
    state.project.configs.document &&
    state.project.configs.document.groups) ||
  {};
const useTrimboxSelector = state =>
  (state &&
    state.project.configs &&
    state.project.configs.document &&
    state.project.configs.document.showTrimbox) ||
  false;
const objectsSelector = state =>
  (state && state.project && state.project.objects) || {};
const activePageIdSelector = state =>
  (state && state.project && state.project.activePage) || null;
const selectedPageIdSelector = state =>
  (state && state.project && state.project.selectedPage) || null;
const activeGroupIdSelector = state =>
  (state && state.project && state.project.activeGroup) || null;

const selectedObjectsIdsSelector = state =>
  (state && state.project && state.project.selectedObjectsIds) || [];

const selectedActionsIdsSelector = state =>
  (state && state.project && state.project.selectedActionObjectsIds) || [];

const activeSelectionSelector = state =>
  (state && state.project && state.project.activeSelection) || null;
let getObjectsInGroup = (pageObjectsIds, allObjects, activePage) => {
  let result = {};
  result = pick(pageObjectsIds, allObjects);
  forEachObjIndexed(obj => {
    if (obj.type == "group") {
      obj._elements = getObjectsInGroup(
        obj._objectsIds,
        allObjects,
        activePage
      );
    }
    obj.offsetLeft = activePage.width;
    obj.offsetTop = activePage.height;
  }, result);
  return result;
};
const documentBoxesSelector = state =>
  (state && state.project.configs.pages && state.project.configs.pages.boxes) ||
  {};
const zoomSelector = state =>
  (state && state.ui && state.ui.workArea && state.ui.workArea.zoom) || 1;
const getPagesWithObjects = (
  activeGroupPages,
  pages,
  objects,
  useTrimbox,
  boxes,
  activeGroupId,
  selectedPageId
) => {
  const firstPage = pages[head(activeGroupPages)];
  let activePage = {
    id: activeGroupId,
    width: useTrimbox ? boxes["trimbox"]["left"] : 0,
    height: useTrimbox ? boxes["trimbox"]["top"] : 0,
    overlays: [],
    objects: {}
  };
  let left = 0;
  let initialWidth = activePage.width;
  const lastPageId = takeLast(1, activeGroupPages);
  forEach(currentPageId => {
    const page = pages[currentPageId];
    let pageObjects = {};

    pageObjects = merge(
      pageObjects,
      getObjectsInGroup(page.objectsIds, objects, activePage)
    );
    activePage = {
      id: activeGroupId,
      width: activePage.width + page.width,
      height: activePage.height,
      objects: merge(activePage.objects, pageObjects),
      overlays: activePage.overlays
    };
    if (currentPageId != selectedPageId) {
      const overlay = {
        group_id: activeGroupId,
        id: currentPageId,
        left: left,
        width:
          lastPageId == currentPageId && useTrimbox
            ? page.width + boxes["trimbox"]["right"]
            : page.width + initialWidth
      };
      activePage.overlays.push(overlay);
    }
    left = activePage.width;
    initialWidth = 0;
  }, activeGroupPages);
  const lastPage = pages[lastPageId];
  activePage.width += useTrimbox ? boxes["trimbox"]["right"] : 0;
  activePage.height += useTrimbox
    ? boxes["trimbox"]["top"] + lastPage.height
    : lastPage.height;

  return activePage;
};

const activePageSelector = createSelector(
  [
    pagesSelector,
    objectsSelector,
    selectedObjectsIdsSelector,
    selectedActionsIdsSelector,
    activeGroupIdSelector,
    groupsSelector,
    documentBoxesSelector,
    useTrimboxSelector,
    selectedPageIdSelector
  ],
  (
    pages,
    objects,
    selectedObejectsIds,
    selectedObjectsAction,
    activeGroupId,
    groups,
    boxes,
    useTrimbox,
    selectedPageId
  ) => {
    const activeGroupPages = groups[activeGroupId];
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
    const activePage = getPagesWithObjects(
      activeGroupPages,
      pages,
      objects,
      useTrimbox,
      boxes,
      activeGroupId,
      selectedPageId
    );
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
  pagesSelector,
  groupsSelector,
  selectedPageIdSelector,
  zoomSelector
};
