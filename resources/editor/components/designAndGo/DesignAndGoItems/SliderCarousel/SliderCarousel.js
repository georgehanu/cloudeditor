import React from "react";
import { withNamespaces } from "react-i18next";
import CustomSlider from "../ReWrite/CustomSlider";
import UploadImage from "../LayoutItems/UploadImage";

class SliderCarousel extends React.Component {
  state = {
    showFullSlider: false
  };

  changeSlider = value => {
    if (value && this.state.showFullSlider) {
      return false;
    }
    this.setState({ showFullSlider: !this.state.showFullSlider });
    return !this.state.showFullSlider;
  };

  componentDidMount() {
    window.changeSlider = this.changeSlider;
  }

  render() {
    const className =
      "SliderCarousel " + (this.state.showFullSlider ? "" : "SmallSlider");
    const pages = this.props.sliderData.map((el, index) => {
      let className = "SliderPage " + el.classImg;
      return (
        <div key={index}>
          <div className={className} />
          {el.upload && <UploadImage />}
        </div>
      );
    });
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      draggable: false,
      verticalSwiping: false
    };
    return (
      <div className={className}>
        <CustomSlider {...settings}>{pages}</CustomSlider>
      </div>
    );
  }
}

export default withNamespaces("designAndGo")(SliderCarousel);
