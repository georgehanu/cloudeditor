import {
  LayerPoptext,
  ImageMenuChangeBackground,
  ImageMenuChangeShape,
  ImageMenuPoptext
} from "./toolbarItems";
import * as Types from "../ToolbarConfig/types";

const image = {
  groups: [
    {
      location: Types.Position.TOP,
      position: 1,
      items: [LayerPoptext]
    },
    {
      location: Types.Position.TOP,
      position: 2,
      className: "GroupWithBorder",
      items: [
        {
          baseType: Types.SLIDER_INLINE,
          /*handler: Handler,*/
          defaultValue: 40
        }
      ]
    },
    {
      location: Types.Position.TOP,
      position: 3,
      items: [
        {
          type: Types.SIMPLE_ICON,
          handler: null,
          threshold: 50
        },
        ImageMenuChangeBackground,
        ImageMenuChangeShape,
        ImageMenuPoptext
      ]
    },
    {
      /* used to fill subElements */
      location: Types.Position.HIDDEN,
      items: {
        [Types.SPECIAL_EFFECTS_WND]: {
          image: Image,
          brightnessValue: -20,
          contrastValue: 80,
          brightnessClass: "flip_horizontal",
          brightnessFilter: "grayscale(1)"
        },
        [Types.SLIDER_OPACITY_WND]: {
          defaultValue: 75
        }
      }
    }
  ],
  style: {
    backgroundColor: "green",
    marginTop: "100px"
  }
};

export default image;
