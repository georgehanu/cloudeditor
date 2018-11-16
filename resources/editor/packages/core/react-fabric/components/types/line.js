const { shape, number, string } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const lineTypes = shape(
  merge(objectTypes, {
    type: string
  })
);

const lineDefaults = merge(objectDefaults, {
  type: "line"
});

module.exports = { lineTypes, lineDefaults };
