import React from "react";
import Fields from "../LayoutItems/Fields";
import Title from "../LayoutItems/Title";
import Description from "../LayoutItems/Description";
import { withNamespaces } from "react-i18next";
import SliderCarousel from "../SliderCarousel/SliderCarousel";

class LeftPanel extends React.Component {
  handleColorChange = color => {
    console.log(color);
  };

  render() {
    console.log(this.props, "LeftPanel");
    return (
      <div className="LeftPanel">
        <div className="MenuButtonContainer">
          <a className="MenuButton" onClick={this.props.onMenuOpenHandler}>
            {this.props.t("MENU")}
          </a>
        </div>
        <div className="LeftPaneHorizontal">
          <div className="LeftPaneHorizontalStyled">
            <Title
              {...this.props.data.title}
              onMenuOpenHandler={this.props.onMenuOpenHandler}
            />
            <Description items={this.props.data.description} />
            {this.props.showSlider && (
              <React.Fragment>
                <SliderCarousel
                  sliderData={this.props.sliderData}
                  onDataOpenHandler={this.props.onDataOpenHandler}
                />
                <div className="EditLabelButtonContainer">
                  <a
                    className="EditLabelButton"
                    onClick={this.props.onDataOpenHandler}
                  >
                    {this.props.t("Edit labels")}
                  </a>
                </div>
              </React.Fragment>
            )}
            <Fields
              items={this.props.data.items}
              handleColorChange={this.handleColorChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces("designAndGo")(LeftPanel);
