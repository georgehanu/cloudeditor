import React from "react";

import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import SliderCarousel from "../SliderCarousel/SliderCarousel";

const Layout = props => {
  return (
    <React.Fragment>
      <div className="Layout">
        <div className="MainContainer">
          <div className="StyledSplitPane">
            <LeftPanel data={props.data} />
            <RightPanel />
          </div>
          <SliderCarousel data={props.sliderData} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
