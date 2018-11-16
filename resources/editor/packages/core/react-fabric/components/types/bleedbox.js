const { shape, number, string, bool, array } = require("prop-types");
const { lineTypes, lineDefaults } = require("./line");
const { merge } = require("ramda");

const bleedBoxTypes = shape(
  merge(lineTypes, {
    stroke: string,
    strokeWidth: number,
    evented: bool,
    selectable: bool
  })
);

const bleedBoxDefaults = merge(lineDefaults, {
  stroke: "rgb(255,0,0)",
  strokeWidth: 1,
  evented: false,
  selectable: false
});

module.exports = { bleedBoxTypes, bleedBoxDefaults };
