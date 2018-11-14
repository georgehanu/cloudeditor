import React from "react";
//import Slider from "react-slick";
import CustomSlider from "../ReWrite/CustomSlider";

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
    const pages = this.props.data.map((el, index) => {
      return (
        <div key={index}>
          <img className="SliderPage" src={el} alt="slideImage" />
        </div>
      );
    });
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      draggable: false
    };
    return (
      <div className={className}>
        <CustomSlider {...settings}>{pages}</CustomSlider>
      </div>
    );
  }
}

export default SliderCarousel;
