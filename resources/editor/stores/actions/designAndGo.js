const {
  DAG_UPLOAD_IMAGE,
  DAG_CHANGE_SLIDER,
  DAG_CHANGE_ACTIVE_COLOR_SCHEMA,
  DAG_CHANGE_COLOR_PICKER
} = require("../actionTypes/designAndGo");
const { createActions } = require("redux-actions");

const { dagUploadImage } = createActions(DAG_UPLOAD_IMAGE);
const { dagChangeSlider } = createActions(DAG_CHANGE_SLIDER);
const { dagChangeActiveColorSchema } = createActions(
  DAG_CHANGE_ACTIVE_COLOR_SCHEMA
);
const { dagChangeColorPicker } = createActions(DAG_CHANGE_COLOR_PICKER);

module.exports = {
  dagUploadImage,
  dagChangeSlider,
  dagChangeActiveColorSchema,
  dagChangeColorPicker
};
