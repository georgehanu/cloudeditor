import React from "react";
import Fields from "../LayoutItems/Fields";
import Title from "../LayoutItems/Title";
import Description from "../LayoutItems/Description";

class LeftPanel extends React.Component {
  handleColorChange = color => {
    console.log(color);
  };

  render() {
    return (
      <div className="LeftPanel">
        <div className="LeftPaneHorizontal">
          <div className="LeftPaneHorizontalStyled">
            <Title {...this.props.data.title} />
            <Description items={this.props.data.description} />
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

export default LeftPanel;
