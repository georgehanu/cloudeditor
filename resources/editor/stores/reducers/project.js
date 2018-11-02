const {
  append,
  mergeDeepLeft,
  forEachObjIndexed,
  reduce,
  without,
  merge
} = require("ramda");
const {
  CHANGE_PROJECT_TITLE,
  ADD_OBJECT,
  ADD_OBJECT_TO_PAGE,
  ADD_OBJECT_ID_TO_SELECTED,
  REMOVE_SELECTION,
  UPDATE_SELECTION_OBJECTS_COORDS,
  UPDATE_OBJECT_PROPS,
  UPDATE_ACTIVE_SELECTION_PROPS,
  UPDATE_CROP_PARAMS
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
const addObjectIdToSelected = (state, payload) => {
  return { ...state, selectedObjectsIds: [payload] };
};
const updateObjectProps = (state, payload) => {
  return {
    ...state,
    objects: {
      ...state.objects,
      [payload.id]: merge(state.objects[payload.id], payload.props)
    }
  };
};
const removeSelection = (state, payload) => {
  return {
    ...state,
    activeSelection: null,
    selectedObjectsIds: []
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
      return addObjectIdToSelected(state, action.payload);
    },
    [UPDATE_OBJECT_PROPS]: (state, action) => {
      return updateObjectProps(state, action.payload);
    },
    [REMOVE_SELECTION]: (state, action) => {
      return removeSelection(state, action.payload);
    },
    [UPDATE_SELECTION_OBJECTS_COORDS]: (state, action) => {
      let objectsChanges = reduce(
        (acc, value) => {
          const key = value.id;
          delete value.id;
          acc[key] = value;
          return acc;
        },
        {},
        action.payload.objectProps
      );
      return {
        ...state,
        activeSelection: action.payload.props,
        objects: mergeDeepLeft(objectsChanges, state.objects)
      };
    },
    [UPDATE_ACTIVE_SELECTION_PROPS]: (state, action) => {
      return {
        ...state,
        activeSelection: action.payload
      };
    },
    [UPDATE_CROP_PARAMS]: (state, action) => {
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.payload.id]: merge(
            state.objects[action.payload.id],
            action.payload.props
          )
        }
      };
    }
  },
  initialState
);
