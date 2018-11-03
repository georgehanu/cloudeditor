const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");

const { forEachObjIndexed } = require("ramda");
const { activePageSelector } = require("./../project");

const snapLinesSelector = createSelector([activePageSelector], activePage => {
  const objects = { ...activePage.objects };
  let lines = [];
  forEachObjIndexed(obj => {
    lines.push({ x: obj.left, y: 0, width: 1, height: activePage.height });
    lines.push({
      x: obj.left + obj.width,
      y: 0,
      width: 1,
      height: activePage.height
    });
    lines.push({ x: 0, y: obj.top, width: activePage.width, height: 1 });
    lines.push({
      x: 0,
      y: obj.top + obj.height,
      width: activePage.width,
      height: 1
    });
  }, objects);
  return lines;
});

module.exports = {
  snapLinesSelector
};
