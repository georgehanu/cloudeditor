const { fabric } = require("../../../../rewrites/fabric/fabric");
const logger = require("../../../../utils/LoggerUtils");
const { TextboxTypes, TextboxDefaults } = require("./types/textbox");
const { debounce } = require("underscore");
const Text = require("./Text");

class Textbox extends Text {
  _initInstance() {
    this.instance = new fabric.Textbox(this.props.text, this.props);
    this.attachEvents();
    this.instance.isLoaded = 1;
    this._applyProps(this.props);
  }
  attachEvents() {
    this.instance.on(
      "changed",
      debounce(e => {
        if (
          this.instance.designerCallbacks &&
          typeof this.instance.designerCallbacks.updateObjectProps ===
            "function"
        ) {
          this.instance.designerCallbacks.updateObjectProps({
            id: this.instance.id,
            props: {
              fontSize: this.instance.fontSize,
              text: this.instance.text
            }
          });
        }
      })
    );
  }
}

Textbox.propTypes = TextboxTypes;
Textbox.defaultProps = TextboxDefaults;

module.exports = Textbox;
