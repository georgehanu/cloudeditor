const {
  ADD_IMAGE_TO_GALLERY,
  REMOVE_IMAGE_FROM_GALLERY,
  ADD_PDF_TO_GALLERY,
  REMOVE_PDF_FROM_GALLERY,
  SET_MOVEABLE,
  SET_RESIZABLE,
  SET_SNAP,
  SET_ROTATE
} = require("../actionTypes/ui");

const initialState = {
  uploadedImages: [],
  storeImages: [],
  uploadedPdfs: [],
  moveable: false,
  resizable: false,
  snap: true,
  rotate: false
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
    },
    [SET_MOVEABLE]: (state, action) => {
      return {
        ...state,
        moveable: !state.moveable
      };
    },
    [SET_RESIZABLE]: (state, action) => {
      return {
        ...state,
        resizable: !state.resizable
      };
    },
    [SET_SNAP]: (state, action) => {
      return {
        ...state,
        snap: !state.snap
      };
    },
    [SET_ROTATE]: (state, action) => {
      return {
        ...state,
        rotate: !state.rotate
      };
    }
  },
  initialState
);
