const React = require("react");
const {
  matchesSelectorAndParentsTo,
  addEvent,
  removeEvent
} = require("./utils/DomFnsUtils");
const PropTypes = require("prop-types");

const eventsFor = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  }
};

// Default to mouse events.
let dragEventFor = eventsFor.mouse;

class DRR extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.listners = {
      draggable: {
        mouseStart: this.startDrag,
        mouseMove: this.onDrag,
        mouseStop: this.stopDrag
      },
      rotatable: {
        mouseStart: this.startRotate,
        mouseMove: this.onRotate,
        mouseStop: this.stopRotate
      }
    };
  }

  componentDidMount() {
    console.log("componentDidMount", this.el.current);
  }

  onMouseDown = e => {
    dragEventFor = eventsFor.mouse;
    return this.handleMouseStart(e);
  };
  onTouchStart = e => {
    dragEventFor = eventsFor.touch;
    return this.handleMouseStart(e);
  };
  onMouseUp = e => {
    dragEventFor = eventsFor.mouse;
    return this.handleMouseStop(e);
  };
  onTouchEnd = e => {
    dragEventFor = eventsFor.touch;
    return this.handleMouseStop(e);
  };

  handleMouseStart = e => {
    if (
      !this.props.allowAnyClick &&
      typeof e.button === "number" &&
      e.button !== 0
    )
      return false;

    const ownerDocument = this.el.current;
    console.log(
      matchesSelectorAndParentsTo(e.target, ".rotatable-handle", ownerDocument)
    );

    addEvent(ownerDocument, dragEventFor.move, this.handleMouseMove);
    addEvent(ownerDocument, dragEventFor.stop, this.handleMouseStop);
  };

  handleMouseMove = e => {
    console.log("handleDrag", e);
    this.props.onDrag(e);
  };
  handleMouseStop = e => {
    const ownerDocument = this.el.current;
    removeEvent(ownerDocument, dragEventFor.move, this.handleMouseMove);
    removeEvent(ownerDocument, dragEventFor.stop, this.handleMouseStop);
  };

  render() {
    const children = React.Children.only(this.props.children);

    return React.cloneElement(children, {
      onMouseDown: this.onMouseDown,
      onTouchStart: this.onTouchStart,
      onMouseUp: this.onMouseUp,
      onTouchEnd: this.onTouchEnd,
      ref: this.el
    });
  }
}

DRR.propTypes = {
  allowAnyClick: PropTypes.bool,
  dragHandle: PropTypes.string,
  rotatableHandle: PropTypes.string
};
DRR.defaultProps = {
  allowAnyClick: false,
  dragHandle: "root",
  rotatableHandle: ".rotatable-handle"
};

module.exports = DRR;

// const DdrLifecycle = lifecycle({
//   constructor: function() {
//     this.el = React.createRef();
//   },
//   componentDidMount: function() {
//     console.log("HOC LCH", this);
//   }
// });

// const DrrWithHandlers = withHandlers({
//   onClick: event => {
//     console.log("on?Click", event.target);
//   }
// });

// module.exports = compose(
//   pure,
//   DdrLifecycle,
//   withState("happiness", "changeHappiness", 0),
//   withHandlers({
//     onClick: ({ changeHappiness }) => () =>
//       changeHappiness(happiness => happiness + 1)
//   })
// );
