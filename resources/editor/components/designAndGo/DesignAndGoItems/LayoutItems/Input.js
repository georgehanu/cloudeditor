import React from "react";

const Input = props => {
  const className = "InputLabelContainer";
  const maxLenght = props.maxLenght ? props.maxLenght : 25;
  return (
    <div className={props.class}>
      <label className={className}>
        <span>{props.label}</span>
        <div className="InputLabelContent">
          <input type="text" maxLength={maxLenght} value={props.text} />
        </div>
      </label>
    </div>
  );
};

export default Input;
