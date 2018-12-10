import React from "react";
import ReactDOM from "react-dom";
import burgerLogo from "./burger-logo.png";
import json from "./test.json";
const App = () => {
  return (
    <div>
      <p>
        {json.test} asa adsad
        <img src={burgerLogo} />
      </p>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
