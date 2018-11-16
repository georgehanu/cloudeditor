const React = require("react");

require("./Back.css");

const back = props => {
  return (
    <div className="backButton" onClick={() => props.clicked()}>
      {props.msg}
    </div>
  );
};

module.exports = back;
