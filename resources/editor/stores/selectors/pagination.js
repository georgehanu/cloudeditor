const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");
const {
  head,
  last,
  init,
  remove,
  splitEvery,
  forEach,
  prepend,
  append,
  pick
} = require("ramda");
const {
  pagesSelector,
  activePageIdSelector,
  objectsSelector
} = require("./project");

const groupNumberSelector = state =>
  (state &&
    state.project &&
    state.project.configs &&
    state.project.configs.document &&
    state.project.configs.document.facingNumber) ||
  1;
const pagesOrderSelector = state =>
  (state && state.project && state.project.pagesOrder) || {};
const paginationPagesSelector = createSelector(
  [
    objectsSelector,
    pagesSelector,
    activePageIdSelector,
    groupNumberSelector,
    pagesOrderSelector
  ],
  (allObjects, pages, activePageId, numberOfPagesInGroup, pagesOrder) => {
    let pagesIds = [];
    forEach(pageId => {
      const active = pageId == activePageId ? true : false;
      const pageObjectsIds = pages[pageId]["objectsIds"];
      const pageObjects = pick(pageObjectsIds, allObjects);
      pagesIds.push([
        {
          id: pageId,
          active: active,
          page: { objects: pageObjects, ...pages[pageId] }
        }
      ]);
    }, pagesOrder);
    const firstPage = head(pagesIds);
    const lastPage = last(pagesIds);
    let groups = {};
    pagesIds = init(pagesIds);
    pagesIds = remove(0, 1, pagesIds);
    pagesIds = splitEvery(numberOfPagesInGroup, pagesIds);
    pagesIds = prepend([firstPage], pagesIds);
    pagesIds = append([lastPage], pagesIds);
    return { pagesIds };
  }
);

module.exports = {
  paginationPagesSelector
};
