const { append, merge } = require("ramda");
const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  AFTER_OBJECT_MOVED
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
const changeElementPosition = (state, obj_id, props) => {
  return {
    ...state,
    objects: { ...state.objects, [obj_id]: merge(state.objects[obj_id], props) }
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
    [ADD_OBJECT_ID_TO_SELECTED]: (state, action) => {
      return { ...state, selectedObjectsIds: action.payload };
    },
    [REMOVE_SELECTION]: state => {
      return { ...state, selectedObjectsIds: [] };
    },
    [AFTER_OBJECT_MOVED]: (state, action) => {
      return changeElementPosition(
        state,
        action.payload.id,
        action.payload.props
      );
    }
  },
  initialState
);
