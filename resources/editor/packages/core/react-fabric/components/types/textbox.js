const { shape } = require("prop-types");
const { textTypes, textDefaults } = require("./text");
const { merge } = require("ramda");

const TextboxTypes = shape(merge(textTypes, {}));

const TextboxDefaults = merge(textDefaults, {
  type: "textbox",
  fontSize: 120
});

module.exports = { TextboxTypes, TextboxDefaults };
