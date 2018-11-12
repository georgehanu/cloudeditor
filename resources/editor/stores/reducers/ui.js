const {
  ADD_IMAGE_TO_GALLERY,
  REMOVE_IMAGE_FROM_GALLERY,
  ADD_PDF_TO_GALLERY,
  REMOVE_PDF_FROM_GALLERY
} = require("../actionTypes/ui");

const initialState = {
  uploadedImages: [],
  storeImages: [],
  uploadedPdfs: []
};
const uuidv4 = require("uuid/v4");
const { handleActions } = require("redux-actions");

module.exports = handleActions(
  {
    [ADD_IMAGE_TO_GALLERY]: (state, action) => {
      const newUploadedImages = [...state.uploadedImages];
      newUploadedImages.push({
        id: uuidv4(),
        name: action.payload.name,
        src: action.payload.src
      });
      return {
        ...state,
        uploadedImages: newUploadedImages
      };
    },
    [REMOVE_IMAGE_FROM_GALLERY]: (state, action) => {
      const newUploadedImages = state.uploadedImages.filter(el => {
        return el.id !== action.payload.id;
      });
      return {
        ...state,
        uploadedImages: newUploadedImages
      };
    },
    [ADD_PDF_TO_GALLERY]: (state, action) => {
      const newUploadedPdf = [...state.uploadedPdfs];
      newUploadedPdf.push({
        id: uuidv4(),
        name: action.payload.name,
        src: action.payload.src
      });
      return {
        ...state,
        uploadedPdfs: newUploadedPdf
      };
    },
    [REMOVE_PDF_FROM_GALLERY]: (state, action) => {
      const newUploadedPdfs = state.uploadedPdfs.filter(el => {
        return el.id !== action.payload.id;
      });
      return {
        ...state,
        uploadedPdfs: newUploadedPdfs
      };
    }
  },
  initialState
);
