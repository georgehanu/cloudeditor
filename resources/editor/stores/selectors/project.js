const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");

const { pick } = require("ramda");

const pagesSelector = state =>
  (state && state.project && state.project.pages) || {};
const objectsSelector = state =>
  (state && state.project && state.project.objects) || {};
const activePageIdSelector = state =>
  (state && state.project && state.project.activePage) || null;

const activePageSelector = createSelector(
  [pagesSelector, objectsSelector, activePageIdSelector],
  (pages, objects, pageId) => {
    const page = pages[pageId];
    const activePage = {
      id: page.id,
      width: page.width,
      height: page.height,
      objects: pick(page.objectsIds, objects),
      background: page.background
    };

    return activePage;
  }
);

module.exports = {
  activePageSelector,
  activePageIdSelector
};
