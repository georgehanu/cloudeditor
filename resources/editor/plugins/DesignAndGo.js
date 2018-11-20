import React from "react";
import * as Types from "../components/designAndGo/DesignAndGoConfig/types";

import Jam1 from "../assets/default/designAndGo/Jam1.png";
import Jam2 from "../assets/default/designAndGo/Jam2.png";
import Jam3 from "../assets/default/designAndGo/Jam3.png";
import Jam4 from "../assets/default/designAndGo/Jam4.png";

import Layout from "../components/designAndGo/DesignAndGoItems/LayoutItems/Layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { withNamespaces } from "react-i18next";
import MenuModal from "../components/designAndGo/DesignAndGoItems/UI/MenuModal";
import MenuDataModal from "../components/designAndGo/DesignAndGoItems/UI/MenuDataModal";
import SignInModal from "../components/designAndGo/DesignAndGoItems/UI/SignInModal";

const assign = require("object-assign");

// this should be in store ???
const pageData = [
  { image: Jam1, upload: true, classImg: "ImageJam1" },
  { image: Jam2, classImg: "ImageJam2" },
  { image: Jam3, upload: true, classImg: "ImageJam3" },
  { image: Jam4, classImg: "ImageJam4" }
];

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
        type: Types.UPLOAD_IMAGE,
        class: "Button Input",
        fieldName: "send"
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
  state = {
    menuOpened: false,
    dataOpened: false,
    signInOpened: false
  };

  onMenuCloseHandler = () => {
    this.setState({
      menuOpened: false,
      dataOpened: false,
      signInOpened: false
    });
  };
  onMenuOpenHandler = () => {
    this.setState({ menuOpened: true });
  };
  onDataOpenHandler = () => {
    this.setState({ dataOpened: true });
  };
  onSignInOpenHandler = () => {
    this.setState({ menuOpened: false, signInOpened: true });
  };

  render() {
    return (
      <div className="DesignAndGo">
        <div className="DesignAndGoMenu">
          {this.state.menuOpened && (
            <MenuModal
              show={this.state.menuOpened}
              modalClosed={this.onMenuCloseHandler}
              onSignInOpenHandler={this.onSignInOpenHandler}
            />
          )}
          {this.state.dataOpened && (
            <MenuDataModal
              show={this.state.dataOpened}
              modalClosed={this.onMenuCloseHandler}
              data={Config.data}
            />
          )}
        </div>
        {this.state.signInOpened && (
          <SignInModal
            show={this.state.signInOpened}
            modalClosed={this.onMenuCloseHandler}
          />
        )}

        <Layout
          data={Config.data}
          sliderData={pageData}
          onMenuOpenHandler={this.onMenuOpenHandler}
          onDataOpenHandler={this.onDataOpenHandler}
        />
      </div>
    );
  }
}

const DesignAndGoPlugin = withNamespaces("designAndGo")(DesignAndGo);

module.exports = {
  DesignAndGo: assign(DesignAndGoPlugin),
  reducers: { designAndGo: require("../stores/reducers/designAndGo") },
  epics: require("../stores/epics/designAndGo")
};
