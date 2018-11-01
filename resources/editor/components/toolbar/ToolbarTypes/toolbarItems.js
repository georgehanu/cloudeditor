import * as Types from "../ToolbarConfig/types";
import * as Operation from "../ToolbarConfig/operation";

export const Bold = {
  type: Types.BUTTON_LETTER_BOLD
};

export const Italic = {
  type: Types.BUTTON_LETTER_ITALIC
};

export const Underline = {
  type: Types.BUTTON_LETTER_UNDERLINE
};

export const LeftAligned = {
  type: Types.BUTTON_LEFT_ALIGNED
};
export const RightAligned = {
  type: Types.BUTTON_RIGHT_ALIGNED
};
export const CenterAligned = {
  type: Types.BUTTON_CENTER_ALIGNED
};

export const JustifyAligned = {
  type: Types.BUTTON_JUSTIFY_ALIGNED,
  position: 0
};

export const MenuPoptext = {
  type: Types.POPTEXT_MENU
};

export const VAlignPoptext = {
  type: Types.POPTEXT_VALIGN,
  selected: "bottom_valign"
};

export const LayerPoptext = {
  type: Types.POPTEXT_LAYER,
  operation: Operation.MERGE_DATA,
  newData: [{ value: "sendbackward", disabled: true }]
};

export const FontPoptext = {
  type: Types.POPTEXT_FONT
};

export const TextSpaceingSlider = {
  type: Types.SLIDER_TEXT_SPACEING
};

export const FontSizeIncremental = {
  type: Types.INCREMENTAL_FONT_SIZE
};

export const ColorSelector = {
  type: Types.COLOR_SELECTOR
};

export const ImageMenuPoptext = {
  type: Types.POPTEXT_IMAGE_MENU
};
export const ImageMenuChangeBackground = {
  type: Types.BUTTON_CHANGE_IMAGE
};
export const ImageMenuChangeShape = {
  type: Types.BUTTON_CHANGE_SHAPE,
  settingsPayload: { image: Image, startValue: 180 }
};
export const Duplicate = {
  type: Types.BUTTON_DUPLICATE
};

export const ColorSelectorBackground = {
  type: Types.COLOR_SELECTOR_BACKGROUND
};

export const ImageShapeMenuPoptext = {
  type: Types.POPTEXT_IMAGE_SHAPE_MENU
};
