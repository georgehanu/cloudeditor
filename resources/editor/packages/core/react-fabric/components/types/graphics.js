const { shape, array } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const graphicsTypes = shape(
  merge(objectTypes, {
    _objects: array
  })
);

const graphicsDefaults = merge(objectDefaults, {
  _objects: []
});

module.exports = { graphicsTypes, graphicsDefaults };
