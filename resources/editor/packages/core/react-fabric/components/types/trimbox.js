const { shape, number, string, bool, array } = require("prop-types");
const { lineTypes, lineDefaults } = require("./line");
const { merge } = require("ramda");

const trimBoxTypes = shape(
  merge(lineTypes, {
    stroke: string,
    strokeWidth: number,
    evented: bool,
    selectable: bool
  })
);

const trimBoxDefaults = merge(lineDefaults, {
  stroke: "rgb(0,0,0)",
  strokeWidth: 0,
  evented: false,
  selectable: false
});

module.exports = { trimBoxTypes, trimBoxDefaults };
