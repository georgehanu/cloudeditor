const { append } = require("ramda");
const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  CHANGE_OBJECT_POSITION,
  CHANGE_OBJECT_DIMENSIONS
} = require("../actionTypes/project");
const ProjectUtils = require("../../utils/ProjectUtils");
const { handleActions } = require("redux-actions");

const changeProjectTitle = (state, action) => {
  return {
    ...state,
    title: action.title
  };
};

const addObject = (state, action) => {
  return {
    ...state,
    objects: {
      ...state.objects,
      [action.object.id]: action.object
    }
  };
};

const addObjectToPage = (state, action) => {
  const { object, pageId } = action;
  const page = {
    ...state.pages[pageId],
    objectsIds: state.pages[pageId].objectsIds.concat(object.id)
  };

  return {
    ...state,
    pages: {
      ...state.pages,
      [pageId]: {
        ...state.pages[pageId],
        objectsIds: append(object.id, state.pages[pageId].objectsIds)
      }
    },
    objects: {
      ...state.objects,
      [object.id]: object
    }
  };
};
const changeObjectPosition = (state, action) => {
  const { id, top, left } = action;
  return {
    ...state,
    objects: {
      ...state.objects,
      [id]: {
        ...state.objects[id],
        top: top,
        left: left
      }
    }
  };
};
const changeObjectDimesions = (state, action) => {
  const { id, width, height } = action;
  return {
    ...state,
    objects: {
      ...state.objects,
      [id]: {
        ...state.objects[id],
        width: width,
        height: height
      }
    }
  };
};

const emptyProject = ProjectUtils.getRandomProject();

const initialState = {
  ...emptyProject
};

module.exports = handleActions(
  {
    [CHANGE_PROJECT_TITLE]: (state, action) => {
      return changeProjectTitle(state, action.payload);
    },
    [ADD_OBJECT]: (state, action) => {
      return addObject(state, action.payload);
    },
    [ADD_OBJECT_TO_PAGE]: (state, action) => {
      return addObjectToPage(state, action.payload);
    },
    [CHANGE_OBJECT_POSITION]: (state, action) => {
      return changeObjectPosition(state, action.payload);
    },
    [CHANGE_OBJECT_DIMENSIONS]: (state, action) => {
      return changeObjectDimesions(state, action.payload);
    }
  },
  initialState
);
