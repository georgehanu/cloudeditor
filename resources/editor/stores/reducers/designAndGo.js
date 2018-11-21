import {
  DAG_UPLOAD_IMAGE,
  DAG_UPLOAD_IMAGE_SUCCESS,
  DAG_UPLOAD_IMAGE_FAILED,
  DAG_CHANGE_SLIDER,
  DAG_CHANGE_ACTIVE_COLOR_SCHEMA,
  DAG_CHANGE_COLOR_PICKER
} from "../actionTypes/designAndGo";

import { handleActions } from "redux-actions";
/*
import Jam1 from "../../assets/default/designAndGo/Jam1.png";
import Jam2 from "../../assets/default/designAndGo/Jam2.png";
import Jam3 from "../../assets/default/designAndGo/Jam3.png";
import Jam4 from "../../assets/default/designAndGo/Jam4.png";*/

const initialState = {
  loading: false,
  imagePath: null,
  errorMessage: null,
  activeSlider: 0,
  sliderData: [
    {
      //image: Jam1,
      upload: true,
      classImg: "ImageJam1",
      colors: [
        {
          containerBgColor: "green",
          color1: "blue",
          color2: "yellow"
        },
        { color1: "blue", color2: "yellow" },
        {},
        {
          colorPicker: true,
          containerBgColor: "green"
        }
      ],
      activeColorButton: 0
    },
    {
      //image: Jam2,
      classImg: "ImageJam2",
      colors: [
        {
          containerBgColor: "red",
          color1: "blue",
          color2: "yellow"
        },
        { color1: "blue", color2: "yellow" },
        {},
        {
          colorPicker: true,
          containerBgColor: "yellow"
        }
      ],
      activeColorButton: 1
    },
    {
      //image: Jam3,
      upload: true,
      classImg: "ImageJam3",
      colors: [
        {
          containerBgColor: "blue",
          color1: "blue",
          color2: "yellow"
        },
        { color1: "blue", color2: "yellow" },
        {},
        {
          colorPicker: true,
          containerBgColor: "blue"
        }
      ],
      activeColorButton: 2
    },
    {
      //image: Jam4,
      classImg: "ImageJam4",
      colors: [
        {
          containerBgColor: "green",
          color1: "blue",
          color2: "yellow"
        },
        { color1: "blue", color2: "yellow" },
        {},
        {
          colorPicker: true,
          containerBgColor: "green"
        }
      ],
      activeColorButton: 3
    }
  ]
};

module.exports = handleActions(
  {
    [DAG_UPLOAD_IMAGE]: (state, action) => {
      return {
        ...state,
        loading: true
      };
    },
    [DAG_UPLOAD_IMAGE_SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        imagePath: action.payload,
        errorMessage: null
      };
    },
    [DAG_UPLOAD_IMAGE_FAILED]: (state, action) => {
      return {
        ...state,
        loading: false,
        imagePath: null,
        errorMessage: action.payload
      };
    },
    [DAG_CHANGE_SLIDER]: (state, action) => {
      const sliderElements = state.sliderData.length;
      let newActiveSlider = state.activeSlider;
      if (action.payload) {
        newActiveSlider = ++newActiveSlider % sliderElements;
      } else {
        newActiveSlider =
          newActiveSlider === 0
            ? sliderElements - 1
            : --newActiveSlider % sliderElements;
      }

      return {
        ...state,
        activeSlider: newActiveSlider
      };
    },
    [DAG_CHANGE_ACTIVE_COLOR_SCHEMA]: (state, action) => {
      let newSliderData = [...state.sliderData];
      newSliderData[state.activeSlider] = {
        ...state.sliderData[state.activeSlider],
        activeColorButton: action.payload
      };

      return {
        ...state,
        sliderData: newSliderData
      };
    },
    [DAG_CHANGE_COLOR_PICKER]: (state, action) => {
      let newColors = [...state.sliderData[state.activeSlider].colors];
      const pickerIndex = newColors.findIndex(el => {
        return el.colorPicker === true;
      });
      newColors[pickerIndex] = {
        ...newColors[pickerIndex],
        containerBgColor: action.payload.hex
      };
      let newSliderData = [...state.sliderData];
      newSliderData[state.activeSlider] = {
        ...state.sliderData[state.activeSlider],
        colors: newColors
      };

      return {
        ...state,
        sliderData: newSliderData
      };
    }
  },
  initialState
);
