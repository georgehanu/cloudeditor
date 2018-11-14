import React from "react";

import { Config } from "../../ToolbarConfig/config";
import * as Types from "../../ToolbarConfig/types";
import SpecialEffectsItem from "./SpecialEffectsItem/SpecialEffectsItem";
import Button from "../Button/Button";
import { withState, withHandlers, compose } from "recompose";
import SpecialEffectsBrightnes from "./SpecialEffectsBrightnes/SpecialEffectsBrightnes";

const SpecialEffectsWnd = props => {
  const SpecialEffectsData = [...Config[Types.SPECIAL_EFFECTS_WND].data];

  const items = SpecialEffectsData.map((el, index) => {
    return (
      <li key={index} className="SpecialEffectsGalleryItem">
        <SpecialEffectsItem
          image={props.itemData.image}
          text={el.text}
          className={el.className}
          handler={props.handler}
          ToolbarHandler={props.ToolbarHandler}
        />
      </li>
    );
  });

  let contentTab1 = null;
  let contentTab2 = null;
  if (props.activeTab === 2) {
    contentTab1 = (
      <ul className="SpecialEffectsGallery" style={{ display: "none" }}>
        {items}
      </ul>
    );
    contentTab2 = (
      <SpecialEffectsBrightnes
        visible="true"
        image={props.itemData.image}
        brightnessClass={props.itemData.brightnessClass}
        brightnessFilter={props.itemData.brightnessFilter}
        brightnessValue={props.itemData.brightnessValue}
        contrastValue={props.itemData.contrastValue}
        handler={props.handler}
        ToolbarHandler={props.ToolbarHandler}
      />
    );
  } else {
    contentTab1 = <ul className="SpecialEffectsGallery">{items}</ul>;
    contentTab2 = (
      <SpecialEffectsBrightnes
        visible="false"
        image={props.itemData.image}
        brightnessClass={props.itemData.brightnessClass}
        brightnessFilter={props.itemData.brightnessFilter}
        brightnessValue={props.itemData.brightnessValue}
        contrastValue={props.itemData.contrastValue}
        handler={props.handler}
        ToolbarHandler={props.ToolbarHandler}
      />
    );
  }

  return (
    <div className="SpecialEffectsContainer">
      <div className="SpecialEffectsLeft">
        <Button
          className="SpecialEffectsTab"
          clicked={() => props.setActiveTab(1)}
          spanClassName="icon printqicon-effects"
        />
        <Button
          className="SpecialEffectsTab"
          clicked={() => props.setActiveTab(2)}
          spanClassName="icon printqicon-brightness-contrast"
        />
      </div>
      <div className="SpecialEffectsContent">
        {contentTab1}
        {contentTab2}
      </div>
    </div>
  );
};

const enhance = compose(
  withState("activeTab", "setActiveTab", 1),
  withHandlers({
    handleClick: props => active => {
      props.setActiveTab(active);
    }
  })
);
export default enhance(SpecialEffectsWnd);
