const { fabric } = require("../../../../rewrites/fabric/fabric");
const logger = require("../../../../utils/LoggerUtils");
const {
  staticCanvasTypes,
  staticCanvasDefaults
} = require("./types/staticCanvas");

class StaticCanvas {
  constructor(ref, props) {
    this.ref = ref;
    this.props = props;
    this._initInstance();
  }

  _initInstance() {
    this.instance = new fabric.StaticCanvas(this.ref, this.props);
    this._applyProps(this.props);
  }

  static PropTypes = staticCanvasTypes;
  static defaultProps = staticCanvasDefaults;

  propsToSkip = {
    children: true,
    ref: true,
    key: true,
    style: true,
    image: true
  };

  _applyProps(props, oldProps) {
    const { instance } = this;
    let updatedProps = {};
    let hasUpdates = false;
    for (var key in oldProps) {
      if (this.propsToSkip[key]) {
        continue;
      }

      const isOldEvent = key.slice(0, 5) === "event";
      const propChanged = oldProps[key] !== props[key];
      if (isOldEvent && propChanged) {
        const oldEventName = key
          .substr(6)
          .toLowerCase()
          .replace(/_/g, ":");
        instance.off(oldEventName, oldProps[key]);
      }
      var toRemove = !props.hasOwnProperty(key);
      if (toRemove) {
        instance.set(key, undefined);
      }
    }
    for (var key in props) {
      if (this.propsToSkip[key]) {
        continue;
      }
      const isNewEvent = key.slice(0, 5) === "event";
      const toAdd = oldProps ? oldProps[key] !== props[key] : true;
      if (isNewEvent && toAdd) {
        if (props[key]) {
          const newEventName = key
            .substr(6)
            .toLowerCase()
            .replace(/_/g, ":");
          instance.on(newEventName, props[key]);
        }
      }
      if (
        (oldProps && !isNewEvent && props[key] !== oldProps[key]) ||
        props[key] !== instance.get(key)
      ) {
        hasUpdates = true;
        updatedProps[key] = props[key];
      }
    }

    if (hasUpdates) {
      logger.info("hasUpdates", updatedProps);
      instance.set(updatedProps);
      this._updatePicture(instance);
    }
  }

  _updatePicture() {
    return this.instance.requestRenderAll();
  }
}

module.exports = StaticCanvas;
