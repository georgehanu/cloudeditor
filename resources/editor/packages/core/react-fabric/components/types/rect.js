const { shape, number, string } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const rectTypes = shape(
  merge(objectTypes, {
    rx: number,
    ry: number,
    type: string
  })
);

const rectDefaults = merge(objectDefaults, {
  rx: 0,
  ry: 0,
  type: "rect"
});

module.exports = { rectTypes, rectDefaults };
