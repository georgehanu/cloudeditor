const { DAG_UPLOAD_IMAGE } = require("../actionTypes/designAndGo");
const { createActions } = require("redux-actions");

const { dagUploadImage } = createActions(DAG_UPLOAD_IMAGE);

module.exports = {
  dagUploadImage
};
