const { ADD_IMAGE_FROM_BUTTON } = require("../actionTypes/addButton");
const { createActions } = require("redux-actions");

const { addImageFromButton } = createActions(ADD_IMAGE_FROM_BUTTON);

module.exports = {
  addImageFromButton
};
