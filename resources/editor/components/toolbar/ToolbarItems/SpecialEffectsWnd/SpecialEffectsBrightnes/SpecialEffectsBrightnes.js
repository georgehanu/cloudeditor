import React from "react";

import BrightnessSlider from "./BrightnessSlider";
import { withState, withHandlers, compose } from "recompose";

const SpecialEffectsBrightnes = props => {
  let brightness = props.brightnessValue;
  let contrast = props.contrastValue;
  if (props.effect.brightness !== undefined) {
    brightness = props.effect["brightness"];
  }
  if (props.effect.contrast !== undefined) {
    contrast = props.effect["contrast"];
  }

  const decBrightness = parseFloat(brightness) / 100 + 1;
  const decContrast = parseFloat(contrast) / 100 + 1;

  const filter =
    "brightness(" +
    decBrightness +
    ") contrast(" +
    decContrast +
    ") " +
    (props.brightnessFilter ? props.brightnessFilter : "");
  const visible = props.visible === "false" ? "none" : "block";

  return (
    <div
      className="SpecialEffectsBrightnessImageContainer"
      style={{ display: visible }}
    >
      <img
        src={props.image}
        style={{ filter: filter }}
        className={props.brightnessClass}
      />
      <div>
        <BrightnessSlider
          text="Brightness"
          startValue={brightness}
          handler={props.handleSlider}
        />
        <BrightnessSlider
          text="Contrast"
          startValue={contrast}
          handler={props.handleSlider}
        />
      </div>
    </div>
  );
};

const enhance = compose(
  withState("effect", "setEffect", {}),
  withHandlers({
    handleSlider: props => (text, value) => {
      let newValue = { ...props.effect };
      if (text === "Brightness") {
        newValue["brightness"] = value;
      } else {
        newValue["contrast"] = value;
      }
      props.setEffect(newValue);
      props.ToolbarHandler({
        mainHandler: props.handler,
        payloadMainHandler: { [text]: value },
        keepDetailsWnd: true
      });
    }
  })
);
export default enhance(SpecialEffectsBrightnes);
