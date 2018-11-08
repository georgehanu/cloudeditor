const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");

const { pick } = require("ramda");

const {
  objectsSelector,
  selectedObjectsIdsSelector,
  pagesSelector,
  activePageIdSelector
} = require("./project");

const selectedObjectToolbarSelector = createSelector(
  [objectsSelector, selectedObjectsIdsSelector],
  (objects, selectedObjectsIds) => {
    if (selectedObjectsIds.length === 0) {
      return null;
    }

    const selectedObj = pick(selectedObjectsIds, objects);
    const selectedItem = selectedObj[Object.keys(selectedObj)[0]];

    return selectedItem;
  }
);

const selectedObjectLayerSelector = createSelector(
  [pagesSelector, activePageIdSelector, selectedObjectsIdsSelector],
  (pages, pageId, selectedObj) => {
    if (selectedObj.length === 0) {
      return {};
    }

    const page = pages[pageId];
    const objIndex = page.objectsIds.findIndex(el => {
      return el === selectedObj[Object.keys(selectedObj)[0]];
    });
    let availableLayer = {};
    if (objIndex === 0) {
      availableLayer["back"] = false;
    }
    if (objIndex === page.objectsIds.length - 1) {
      availableLayer["front"] = false;
    }

    return availableLayer;
  }
);
const selectedPageWidthSelector = createSelector(
  [pagesSelector, activePageIdSelector],
  (pages, pageId) => {
    return pages[pageId].width;
  }
);
const selectedPageHeightSelector = createSelector(
  [pagesSelector, activePageIdSelector],
  (pages, pageId) => {
    return pages[pageId].height;
  }
);
module.exports = {
  selectedObjectToolbarSelector,
  selectedObjectLayerSelector,
  selectedPageWidthSelector,
  selectedPageHeightSelector
};
