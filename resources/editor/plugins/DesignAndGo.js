import React from "react";
import * as Types from "../components/designAndGo/DesignAndGoConfig/types";

import Jam1 from "../themes/default/designAndGo/assets/Jam1.png";
import Jam2 from "../themes/default/designAndGo/assets/Jam2.png";
import Jam3 from "../themes/default/designAndGo/assets/Jam3.png";
import Jam4 from "../themes/default/designAndGo/assets/Jam4.png";

import Layout from "../components/designAndGo/DesignAndGoItems/LayoutItems/Layout";
import "../themes/default/designAndGo/plugin.scss";
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
      <div className="App">
        <Layout data={Config.data} sliderData={jamData} />
      </div>
    );
  }
}
/*
const mapStateToProps = state => {
  return {
    activeToolbar: selectedObjectToolbarSelector(state),
    activeLayer: selectedObjectLayerSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setObjectFromToolbar: payload => dispatch(setObjectFromToolbar(payload))
  };
};

const ToolbarPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
*/

module.exports = {
  DesignAndGo: assign(DesignAndGo),
  reducers: {},
  epics: {}
};
