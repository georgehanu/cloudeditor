import React from "react";
import * as Types from "../components/designAndGo/DesignAndGoConfig/types";

import Jam1 from "../assets/default/designAndGo/Jam1.png";
import Jam2 from "../assets/default/designAndGo/Jam2.png";
import Jam3 from "../assets/default/designAndGo/Jam3.png";
import Jam4 from "../assets/default/designAndGo/Jam4.png";

import Layout from "../components/designAndGo/DesignAndGoItems/LayoutItems/Layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const assign = require("object-assign");

// this should be in store ???
const jamData = [Jam1, Jam2, Jam3, Jam4];

const Config = {
  data: {
    title: {
      type: Types.TITLE,
      class: "Title",
      image: Image
    },
    description: [
      {
        type: Types.TEXT,
        text: "Create your own jar label",
        class: "DescriptionHeader"
      },
      {
        type: Types.TEXT,
        text:
          "Add the details about your beer and a custom label will be created for you. Use the arrows beside the bottle to try out different designs.",
        class: "Description"
      }
    ],
    items: [
      {
        type: Types.INPUT,
        label: "Jam name",
        class: "Input InputName",
        fieldName: "wineName",
        text: "Sarah's Special"
      },
      {
        type: Types.INPUT,
        label: "Jam type",
        class: "Input InputType",
        fieldName: "wineType",
        text: "Mixed Berry Jam"
      },
      {
        type: Types.INPUT,
        label: "Tag line - Part one",
        class: "Input",
        fieldName: "wineTagOne",
        text: "Homemade in Aotearoa"
      },
      {
        type: Types.INPUT,
        label: "Tag line - Part two",
        class: "Input",
        fieldName: "wineTagTwo",
        text: "by Sarah Crompton"
      },
      {
        type: Types.INPUT,
        label: "Batch date",
        class: "Input InputDate",
        fieldName: "wineAlcool",
        text: "Nov 2018",
        maxLenght: 12
      },
      {
        type: Types.COLOR,
        label: "Options",
        class: "Input ColorButtonGroup",
        fieldName: "wineAlcool",
        colors: [
          {
            containerColor: "red",
            containerBgColor: "green",
            color1: "blue",
            color2: "yellow"
          },
          { color1: "blue", color2: "yellow" },
          {},
          {
            colorPicker: true,
            containerColor: "red",
            containerBgColor: "green",
            selected: true
          }
        ]
      },
      {
        type: Types.BUTTON,
        label: "Buy Stickers",
        class: "Button",
        fieldName: "send"
      }
    ]
  }
};

class DesignAndGo extends React.Component {
  render() {
    return (
      <div className="DesignAndGo">
        <Layout data={Config.data} sliderData={jamData} />
      </div>
    );
  }
}

module.exports = {
  DesignAndGo: assign(DesignAndGo),
  reducers: {},
  epics: {}
};
