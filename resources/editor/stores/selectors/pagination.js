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
  append
} = require("ramda");
const { pagesSelector, activePageIdSelector } = require("./project");

const groupNumberSelector = state =>
  (state &&
    state.project &&
    state.project.configs &&
    state.project.configs.document &&
    state.project.configs.facingNumber) ||
  1;
const pagesOrderSelector = state =>
  (state && state.project && state.project.pagesOrder) || {};
const paginationPagesSelector = createSelector(
  [activePageIdSelector, groupNumberSelector, pagesOrderSelector],
  (activePageId, numberOfPagesInGroup, pagesOrder) => {
    let pagesIds = [];
    forEach(pageId => {
      const active = pageId == activePageId ? true : false;
      pagesIds.push([{ id: pageId, active: active }]);
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
