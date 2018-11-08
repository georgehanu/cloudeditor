const logger = require("../../../../utils/LoggerUtils");
const { objectTypes, objectDefaults } = require("./types/object");
const { merge } = require("ramda");
class FabricObject {
  constructor(props) {
    this.props = props;
  }

  static PropTypes = objectTypes;
  static defaultProps = objectDefaults;

  propsToSkip = {
    children: true,
    ref: true,
    key: true,
    style: true,
    image: true,
    designerCallbacks: true
  };
  setPropsToSkip(propsToSkip) {
    this.propsToSkip = merge(this.propsToSkip, propsToSkip);
  }
  _applyProps(props, oldProps) {
    const { instance } = this;
    let updatedProps = {};
    let hasUpdates = false;
    for (let key in oldProps) {
      if (this.propsToSkip[key]) {
        continue;
      }

      const isOldEvent = key.slice(0, 2) === "on";
      const propChanged = oldProps[key] !== props[key];
      if (isOldEvent && propChanged) {
        const oldEventName = key.substr(2).toLowerCase();
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
      const isNewEvent = key.slice(0, 2) === "on";
      const toAdd = oldProps ? oldProps[key] !== props[key] : true;
      if (isNewEvent && toAdd) {
        if (props[key]) {
          const newEventName = key.substr(2).toLowerCase();
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
      console.log("marius ", updatedProps);
      this._updatePicture(instance);
      instance.setCoords();
    }
  }

  _updatePicture() {
    const drawingNode = this.instance.canvas;
    if (drawingNode) return drawingNode.requestRenderAll();
  }
}

module.exports = FabricObject;
