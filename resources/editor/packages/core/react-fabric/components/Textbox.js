const { fabric } = require("../../../../rewrites/fabric/fabric");
const logger = require("../../../../utils/LoggerUtils");
const { TextboxTypes, TextboxDefaults } = require("./types/textbox");

const Text = require("./Text");

class Textbox extends Text {
  _initInstance() {
    this.instance = new fabric.Textbox(this.props.text, this.props);
    this.instance.isLoaded = 1;
    this._applyProps(this.props);
  }
}

Textbox.propTypes = TextboxTypes;
Textbox.defaultProps = TextboxDefaults;

module.exports = Textbox;
