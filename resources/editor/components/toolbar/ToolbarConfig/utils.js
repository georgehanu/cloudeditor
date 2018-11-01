import * as Types from "../ToolbarConfig/types";

export const MergeClassName = (defaultClass, newClass) => {
  if (newClass === null || newClass === undefined) {
    return defaultClass;
  }
  if (defaultClass === null) {
    return newClass;
  }

  if (typeof newClass === "string") {
    if (typeof defaultClass === "string") {
      return [defaultClass, newClass].join(" ");
    } else {
      return [...defaultClass, newClass].join(" ");
    }
  } else {
    if (typeof defaultClass === "string") {
      return [defaultClass, ...newClass].join(" ");
    } else {
      return [...defaultClass, ...newClass].join(" ");
    }
  }
};

export const comparePosition = (a, b) => {
  if (a.position > b.position) {
    return 1;
  }
  if (a.position < b.position) {
    return -1;
  }
  return 0;
};

export const filterBasedOnLocation = (items, position) => {
  return items
    .filter(el => {
      return el.location === position;
    })
    .sort((a, b) => comparePosition(a, b));
};

export const LoadImageSettings = activeItem => {
  return {
    [Types.CHANGE_SHAPE_WND]: { image: activeItem.src, startValue: 180 },
    [Types.SPECIAL_EFFECTS_WND]: {
      image: activeItem.src,
      brightnessValue: -20,
      contrastValue: 80,
      brightnessClass: "flip_horizontal",
      brightnessFilter: "grayscale(1)"
    },
    [Types.SLIDER_OPACITY_WND]: {
      defaultValue: 75
    }
  };
};

export const LoadTextSettings = activeItem => {
  return {
    [Types.COLOR_SELECTOR_WND]: {
      selected: {
        [Types.COLOR_TAB_FG]: 0,
        [Types.COLOR_TAB_BG]: 2,
        [Types.COLOR_TAB_BORDER_COLOR]: null,
        [Types.COLOR_TAB_BORDER_WIDTH]: 80
      }
    }
  };
};
