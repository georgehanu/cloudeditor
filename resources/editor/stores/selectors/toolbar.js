const {
  createSelectorWithDependencies: createSelector
} = require("reselect-tools");

const { pick } = require("ramda");

const { objectsSelector, selectedObjectsIdsSelector } = require("./project");

const selectedObjectToolbarSelector = createSelector(
  [objectsSelector, selectedObjectsIdsSelector],
  (objects, selectedObjectsIds) => {
    if (selectedObjectsIds.length === 0) {
      return null;
    }

    const selectedObj = pick(selectedObjectsIds, objects);
    const selectedItem = selectedObj[Object.keys(selectedObj)[0]];

    console.log(selectedItem);
    //selectedObjectsIds = [Object.keys(objects)[0]];
    //selectedObjectsIds = objects[selectedObjectsIds]];
    /*
                    const activeObjects = {
                        objects: pick(selectedObjectsIds, objects)
                    };
            */
    return selectedItem;
  }
);

module.exports = {
  selectedObjectToolbarSelector
};
