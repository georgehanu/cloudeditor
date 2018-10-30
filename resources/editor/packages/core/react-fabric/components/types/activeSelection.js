const { shape, array } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const activeSelectionTypes = shape(
  merge(objectTypes, {
    _objectsIds: array
  })
);

const activeSelectionDefaults = merge(objectDefaults, {
  type: "activeSelection",
  _objectsIds: []
});

module.exports = { activeSelectionTypes, activeSelectionDefaults };
