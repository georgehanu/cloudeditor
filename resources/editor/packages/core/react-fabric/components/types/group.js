const { shape, array } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const groupTypes = shape(
  merge(objectTypes, {
    _objects: array
  })
);

const groupDefaults = merge(objectDefaults, {
  _objects: []
});

module.exports = { groupTypes, groupDefaults };
