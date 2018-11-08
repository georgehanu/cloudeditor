import * as Types from "../ToolbarConfig/types";
import * as Operation from "../ToolbarConfig/operation";

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

export const LoadImageSettings = (toolbar, activeItem, activeLayer) => {
  for (let groupIndex in toolbar.groups) {
    let group = toolbar.groups[groupIndex];
    for (let itemIndex in group.items) {
      let item = group.items[itemIndex];

      if (item.type === Types.POPTEXT_LAYER) {
        item.operation = Operation.MERGE_DATA;
        item.newData = [];
        if (activeLayer.front !== undefined && activeLayer.front === false) {
          item.newData = [
            { value: "bringtofront", disabled: true },
            { value: "bringforward", disabled: true }
          ];
        }
        if (activeLayer.back !== undefined && activeLayer.back === false) {
          item.newData = [
            ...item.newData,
            { value: "sendbackward", disabled: true },
            { value: "sendtoback", disabled: true }
          ];
        }
      }
    }
  }
  return toolbar;
};

export const LoadImageAdditionalInfo = activeItem => {
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

export const LoadTextSettings = (toolbar, activeItem, activeLayer) => {
  for (let groupIndex in toolbar.groups) {
    let group = toolbar.groups[groupIndex];
    for (let itemIndex in group.items) {
      let item = group.items[itemIndex];

      if (item.type === Types.BUTTON_LETTER_BOLD) {
        item.selected = activeItem.bold;
      } else if (item.type === Types.BUTTON_LETTER_ITALIC) {
        item.selected = activeItem.italic;
      } else if (item.type === Types.BUTTON_LETTER_UNDERLINE) {
        item.selected = activeItem.underline;
      } else if (item.type === Types.COLOR_SELECTOR) {
        item.color = activeItem.fill;
      } else if (item.type === Types.SLIDER_TEXT_SPACEING) {
        item.defaultValue = parseInt(activeItem.charSpacing);
      } else if (item.type === Types.INCREMENTAL_FONT_SIZE) {
        item.defaultValue = activeItem.fontSize + ".00";
      } else if (item.type === Types.POPTEXT_FONT) {
        item.value = activeItem.fontFamily;
      } else if (item.type === Types.POPTEXT_LAYER) {
        item.operation = Operation.MERGE_DATA;
        item.newData = [];
        if (activeLayer.front !== undefined && activeLayer.front === false) {
          item.newData = [
            { value: "bringtofront", disabled: true },
            { value: "bringforward", disabled: true }
          ];
        }
        if (activeLayer.back !== undefined && activeLayer.back === false) {
          item.newData = [
            ...item.newData,
            { value: "sendbackward", disabled: true },
            { value: "sendtoback", disabled: true }
          ];
        }
      }
    }
  }
  return toolbar;
};

export const LoadTextAdditionalInfo = activeItem => {
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

export const CreatePayload = (activeitem, itemPayload) => {
  let attrs = {};
  switch (itemPayload.type) {
    case Types.BUTTON_LETTER_BOLD:
      attrs = { bold: !activeitem.bold };
      break;

    case Types.BUTTON_LETTER_ITALIC:
      attrs = { italic: !activeitem.italic };
      break;

    case Types.BUTTON_LETTER_UNDERLINE:
      attrs = { underline: !activeitem.underline };
      break;

    case Types.COLOR_TAB_FG:
      attrs = { fill: itemPayload.value };
      break;

    case Types.SLIDER_FONT_WND:
      attrs = { charSpacing: itemPayload.value };
      break;

    case Types.INCREMENTAL_FONT_SIZE:
      attrs = { fontSize: parseFloat(itemPayload.value) };
      break;

    case Types.POPTEXT_FONT:
      attrs = { fontFamily: itemPayload.value };
      break;

    case Types.POPTEXT_LAYER:
      attrs = { action: itemPayload.value };
      return { id: activeitem.id, props: attrs, action: "layer" };

    case Types.POPTEXT_MENU:
      if (itemPayload.value === "duplicate") {
        return { id: activeitem.id, props: attrs, action: "duplicate" };
      } else {
        return null;
      }

    case Types.POPTEXT_IMAGE_MENU:
      if (itemPayload.value === "duplicate") {
        return { id: activeitem.id, props: attrs, action: "duplicate" };
      } else if (itemPayload.value === "delete") {
        return { id: activeitem.id, props: attrs, action: "delete" };
      } else {
        return null;
      }
  }
  return { id: activeitem.id, props: attrs };
};
