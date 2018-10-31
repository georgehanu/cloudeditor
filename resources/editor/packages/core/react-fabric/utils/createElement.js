const PropTypes = require("prop-types");
const StaticCanvas = require("../components/StaticCanvas");
const Canvas = require("../components/Canvas");
const Image = require("../components/Image");
const Text = require("../components/Text");
const IText = require("../components/IText");
const Textbox = require("../components/Textbox");
const activeSelection = require("../components/activeSelection");
const Group = require("../components/Group");

// Creates an element with an element type, props and a root instance

const TYPES = {
  Image: Image,
  Text: Text,
  IText: IText,
  Textbox: Textbox,
  Canvas: Canvas,
  StaticCanvas: StaticCanvas,
  activeSelection: activeSelection,
  Group: Group
};
function createElement(type, props, ref = null) {
  // Resolve default props
  let forwardedProps = { ...props };
  if (TYPES[type] && TYPES[type].defaultProps) {
    const defaultProps = TYPES[type].defaultProps;
    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        forwardedProps[propName] = defaultProps[propName];
      }
    }
  }

  PropTypes.checkPropTypes(TYPES[type].propTypes, forwardedProps);

  const COMPONENTS = {
    StaticCanvas: () => new StaticCanvas(ref, forwardedProps),
    Canvas: () => new Canvas(ref, forwardedProps),
    Image: () => new Image(forwardedProps),
    Text: () => new Text(forwardedProps),
    IText: () => new IText(forwardedProps),
    Textbox: () => new Textbox(forwardedProps),
    Group: () => new Group(forwardedProps),
    activeSelection: () => new activeSelection(forwardedProps),
    default: undefined
  };

  return COMPONENTS[type]() || COMPONENTS.default;
}

module.exports = { createElement };
