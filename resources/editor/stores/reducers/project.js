const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE
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
    [pageId]: {
      ...state.pages[pageId],
      objectsIds: state.pages[pageId].objectsIds.concat(object.id)
    }
  };

  return {
    ...state,
    pages: { ...state.pages, [pageId]: page },
    objects: {
      ...state.objects,
      [object.id]: object
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
    }
  },
  initialState
);
