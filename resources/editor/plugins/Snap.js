const React = require("react");
const { connect } = require("react-redux");
const { getCanvas } = require("../globals");
class Snap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: true
    };
  }
  checkEvents = () => {
    if (this.state.isEnable) {
      this.instance.on("object:moving", this.onObjectMovingSnap);
      this.instance.on("after:render", this.onAfterRenderSnap);
      this.instance.on("mouse:up", this.onMouseUpSnap);
    } else {
      this.instance.off("object:moving", this.onObjectMovingSnap);
      this.instance.off("after:render", this.onAfterRenderSnap);
      this.instance.off("mouse:up", this.onMouseUpSnap);
    }
    this.vGuidelines = [];
    this.hGuidelines = [];
    this.ctx = this.instance.getContext("2d");
  };
  attachCanvas = canvasReady => {
    if (!canvasReady) {
      return;
    }
    this.instance = getCanvas();

    this.checkEvents();
  };
  componentDidMount() {
    this.attachCanvas(this.props.canvasReady);
  }
  componentDidUpdate() {
    this.attachCanvas(this.props.canvasReady);
  }
  onMouseUpSnap = () => {
    (this.vGuidelines = []), (this.hGuidelines = []), this.instance.renderAll();
  };
  onObjectMovingSnap = e => {
    var currentBlock = e.target,
      objectCoords = this._getObjectCoords(currentBlock),
      checkSnap = this.checkSnap(currentBlock, objectCoords);
    if (checkSnap) {
      currentBlock.setPositionByOrigin(checkSnap, "center", "center");
    }
  };
  _getObjectCoords = currentBlock => {
    let centerPoint = currentBlock.getCenterPoint(),
      blockHeight =
        currentBlock.getBoundingRect().height /
        this.instance.viewportTransform[3],
      blockWidth =
        currentBlock.getBoundingRect().width /
        this.instance.viewportTransform[0];
    return {
      left: centerPoint.x - blockWidth / 2,
      hCenter: centerPoint.x,
      right: centerPoint.x + blockWidth / 2,
      top: centerPoint.y - blockHeight / 2,
      vCenter: centerPoint.y,
      bottom: centerPoint.y + blockHeight / 2,
      width: blockWidth,
      height: blockHeight
    };
  };
  checkSnap = (currentBlock, objectCoords) => {
    if (!this.instance._currentTransform) return null;
    var horizontalGuideLine = {
        snapValue: null,
        guidelines: []
      },
      verticalGuideLine = {
        snapValue: null,
        guidelines: []
      };
    var currentBlockObject = this.instance.getActiveObject();

    this.instance.getObjects().forEach(
      (function(currentBlock) {
        return function(block) {
          if (block.id !== currentBlockObject.id && !block.ignoreSnap) {
            var localeObjectCoords = this._getObjectCoords(block);
            horizontalGuideLine = this._checkObjectXSnap(
              horizontalGuideLine,
              objectCoords,
              localeObjectCoords
            );
            verticalGuideLine = this._checkVerticalObjectSnap(
              verticalGuideLine,
              objectCoords,
              localeObjectCoords
            );
          }
        };
      })(currentBlock),
      this
    );

    horizontalGuideLine = this._checkHorizontalCanvasSnap(
      horizontalGuideLine,
      objectCoords
    );
    verticalGuideLine = this._checkVerticalCanvasSnap(
      verticalGuideLine,
      objectCoords
    );
    horizontalGuideLine = this._checkHorizontalCenterSnap(
      horizontalGuideLine,
      objectCoords
    );
    verticalGuideLine = this._checkVerticalCenterSnap(
      verticalGuideLine,
      objectCoords
    );

    this.vGuidelines = horizontalGuideLine.guidelines;
    this.hGuidelines = verticalGuideLine.guidelines;

    if (
      horizontalGuideLine.snapValue === null &&
      verticalGuideLine.snapValue === null
    ) {
      return null;
    }

    var point = new fabric.Point(
      horizontalGuideLine.snapValue !== null
        ? horizontalGuideLine.snapValue
        : objectCoords.hCenter,
      verticalGuideLine.snapValue !== null
        ? verticalGuideLine.snapValue
        : objectCoords.vCenter
    );

    return point;
  };
  _checkHorizontalCanvasSnap = (horizontalGuideLine, objectCoords) => {
    var middle = objectCoords.width / 2 + this.instance.getCanvasOffsetX(),
      i =
        this.instance.getWidth() -
        this.instance.getCanvasOffsetX() -
        objectCoords.width / 2;

    if (
      this.isInRange(objectCoords.left, this.instance.getCanvasOffsetX()) &&
      this._isCloserOrSame(
        objectCoords.hCenter,
        middle,
        horizontalGuideLine.snapValue
      )
    ) {
      horizontalGuideLine = Object.assign({}, horizontalGuideLine, {
        snapValue: middle,
        guidelines: this._mergeGuidelines(horizontalGuideLine.guidelines, {
          snapValue: middle,
          x: this.instance.getCanvasOffsetX(),
          y1: this.instance.getCanvasOffsetY(),
          y2:
            this.instance.getCanvasWorkingHeight() +
            this.instance.getCanvasOffsetY()
        })
      });
    }
    if (
      this.isInRange(
        objectCoords.right,
        this.instance.getWidth() - this.instance.getCanvasOffsetX()
      ) &&
      this._isCloserOrSame(
        objectCoords.hCenter,
        i,
        horizontalGuideLine.snapValue
      )
    ) {
      horizontalGuideLine = Object.assign({}, horizontalGuideLine, {
        snapValue: i,
        guidelines: this._mergeGuidelines(horizontalGuideLine.guidelines, {
          snapValue: middle,
          x:
            this.instance.getCanvasOffsetX() +
            this.instance.getCanvasWorkingWidth(),
          y1: this.instance.getCanvasOffsetY(),
          y2:
            this.instance.getCanvasWorkingHeight() +
            this.instance.getCanvasOffsetY()
        })
      });
    }
    return horizontalGuideLine;
  };
  _checkVerticalCanvasSnap = (verticalGuideLine, objectCoords) => {
    var middle = objectCoords.height / 2 + this.instance.getCanvasOffsetY(),
      i =
        this.instance.getHeight() -
        this.instance.getCanvasOffsetY() -
        objectCoords.height / 2;

    if (
      this.isInRange(objectCoords.top, this.instance.getCanvasOffsetY()) &&
      this._isCloserOrSame(
        objectCoords.vCenter,
        middle,
        verticalGuideLine.snapValue
      )
    ) {
      verticalGuideLine = Object.assign({}, verticalGuideLine, {
        snapValue: middle,
        guidelines: this._mergeGuidelines(verticalGuideLine.guidelines, {
          snapValue: middle,
          y: this.instance.getCanvasOffsetY(),
          x1: this.instance.getCanvasOffsetX(),
          x2:
            this.instance.getCanvasWorkingWidth() +
            this.instance.getCanvasOffsetX()
        })
      });
    }
    if (
      this.isInRange(
        objectCoords.bottom,
        this.instance.getHeight() - this.instance.getCanvasOffsetY()
      ) &&
      this._isCloserOrSame(objectCoords.vCenter, i, verticalGuideLine.snapValue)
    ) {
      verticalGuideLine = Object.assign({}, verticalGuideLine, {
        snapValue: i,
        guidelines: this._mergeGuidelines(verticalGuideLine.guidelines, {
          snapValue: middle,
          y:
            this.instance.getCanvasOffsetY() +
            this.instance.getCanvasWorkingHeight(),
          x1: this.instance.getCanvasOffsetX(),
          x2:
            this.instance.getCanvasWorkingWidth() +
            this.instance.getCanvasOffsetX()
        })
      });
    }
    return verticalGuideLine;
  };
  _checkHorizontalCenterSnap = (horizontalGuideLine, objectCoords) => {
    var middle = this.instance.getWidth() / 2;

    if (
      this.isInRange(objectCoords.hCenter, this.instance.getWidth() / 2) &&
      this._isCloserOrSame(
        objectCoords.hCenter,
        middle,
        horizontalGuideLine.snapValue
      )
    ) {
      horizontalGuideLine = Object.assign({}, horizontalGuideLine, {
        snapValue: middle,
        guidelines: this._mergeGuidelines(horizontalGuideLine.guidelines, {
          snapValue: middle,
          x: middle,
          y1: this.instance.getCanvasOffsetY(),
          y2:
            this.instance.getCanvasWorkingHeight() +
            this.instance.getCanvasOffsetY()
        })
      });
    }
    return horizontalGuideLine;
  };
  _checkVerticalCenterSnap = (verticalGuideLine, objectCoords) => {
    var middle = this.instance.getHeight() / 2;

    if (
      this.isInRange(objectCoords.vCenter, this.instance.getHeight() / 2) &&
      this._isCloserOrSame(
        objectCoords.vCenter,
        middle,
        verticalGuideLine.snapValue
      )
    ) {
      verticalGuideLine = Object.assign({}, verticalGuideLine, {
        snapValue: middle,
        guidelines: this._mergeGuidelines(verticalGuideLine.guidelines, {
          snapValue: middle,
          y: middle,
          x1: this.instance.getCanvasOffsetX(),
          x2:
            this.instance.getCanvasWorkingWidth() +
            this.instance.getCanvasOffsetX()
        })
      });
    }

    return verticalGuideLine;
  };
  _checkObjectXSnap = (
    horizontalGuideLine,
    objectCoords,
    localeObjectCoords
  ) => {
    var pointsArray = [
      [
        objectCoords.hCenter,
        localeObjectCoords.hCenter,
        localeObjectCoords.hCenter
      ],
      [
        objectCoords.left,
        localeObjectCoords.right,
        localeObjectCoords.right + objectCoords.width / 2
      ],
      [
        objectCoords.right,
        localeObjectCoords.left,
        localeObjectCoords.left - objectCoords.width / 2
      ],
      [
        objectCoords.right,
        localeObjectCoords.right,
        localeObjectCoords.right - objectCoords.width / 2
      ],
      [
        objectCoords.left,
        localeObjectCoords.left,
        localeObjectCoords.left + objectCoords.width / 2
      ]
    ];

    pointsArray.forEach(function(point) {
      if (
        this.isInRange(point[0], point[1]) &&
        this._isCloserOrSame(
          objectCoords.hCenter,
          point[2],
          horizontalGuideLine.snapValue
        )
      ) {
        var u = {
          snapValue: point[2],
          x: point[1],
          y1:
            localeObjectCoords.vCenter < objectCoords.vCenter
              ? localeObjectCoords.top
              : localeObjectCoords.bottom,
          y2:
            localeObjectCoords.vCenter < objectCoords.vCenter
              ? objectCoords.bottom
              : objectCoords.top
        };
        horizontalGuideLine = {
          snapValue: point[2],
          guidelines: this._mergeGuidelines(horizontalGuideLine.guidelines, u)
        };
      }
    }, this);
    return horizontalGuideLine;
  };
  _checkVerticalObjectSnap = (
    verticalGuideLine,
    objectCoords,
    localeObjectCoords
  ) => {
    var pointsArray = [
      [
        objectCoords.vCenter,
        localeObjectCoords.vCenter,
        localeObjectCoords.vCenter
      ],
      [
        objectCoords.top,
        localeObjectCoords.bottom,
        localeObjectCoords.bottom + objectCoords.height / 2
      ],
      [
        objectCoords.bottom,
        localeObjectCoords.top,
        localeObjectCoords.top - objectCoords.height / 2
      ],
      [
        objectCoords.bottom,
        localeObjectCoords.bottom,
        localeObjectCoords.bottom - objectCoords.height / 2
      ],
      [
        objectCoords.top,
        localeObjectCoords.top,
        localeObjectCoords.top + objectCoords.height / 2
      ]
    ];
    pointsArray.forEach(function(point) {
      if (
        this.isInRange(point[0], point[1]) &&
        this._isCloserOrSame(
          objectCoords.vCenter,
          point[2],
          verticalGuideLine.snapValue
        )
      ) {
        var u = {
          snapValue: point[2],
          y: point[1],
          x1:
            localeObjectCoords.hCenter < objectCoords.hCenter
              ? localeObjectCoords.left
              : localeObjectCoords.right,
          x2:
            localeObjectCoords.hCenter < objectCoords.hCenter
              ? objectCoords.right
              : objectCoords.left
        };
        verticalGuideLine = {
          snapValue: point[2],
          guidelines: this._mergeGuidelines(verticalGuideLine.guidelines, u)
        };
      }
    }, this);

    return verticalGuideLine;
  };
  isInRange = (e, t) => {
    return Math.abs(e - t) <= this.instance.snap;
  };
  _isCloserOrSame = (e, t, n) => {
    if (null === t) return !1;
    if (null === n) return !0;
    var r = Math.abs(e - n);
    return Math.abs(e - t) - r <= 1e-4;
  };
  onAfterRenderSnap = () => {
    if (this.instance.interactive) {
      this.vGuidelines.forEach(function(t) {
        this._drawVerticalLine(t);
      }, this);
      this.hGuidelines.forEach(function(t) {
        this._drawHorizontalLine(t);
      }, this);
    }
  };
  _drawVerticalLine = point => {
    this._drawLine(
      point.x,
      point.y1 > point.y2 ? point.y2 : point.y1,
      point.x,
      point.y2 > point.y1 ? point.y2 : point.y1
    );
  };
  _drawHorizontalLine = point => {
    this._drawLine(
      point.x1 > point.x2 ? point.x2 : point.x1,
      point.y,
      point.x2 > point.x1 ? point.x2 : point.x1,
      point.y
    );
  };
  _drawLine = (originX, originY, lineWidth, lineHeight) => {
    var originXY = fabric.util.transformPoint(
        new fabric.Point(originX, originY),
        this.instance.viewportTransform
      ),
      dimmensions = fabric.util.transformPoint(
        new fabric.Point(lineWidth, lineHeight),
        this.instance.viewportTransform
      );
    this.ctx.save();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "rgb(255,0,188)";
    this.ctx.beginPath();
    this.ctx.moveTo(originXY.x, originXY.y);
    this.ctx.lineTo(dimmensions.x, dimmensions.y);
    this.ctx.stroke();
    this.ctx.restore();
  };
  _mergeGuidelines = (e, t) => {
    return e
      .filter(function(e) {
        return Math.abs(e.snapValue - t.snapValue) < 1e-4;
      })
      .concat([t]);
  };
  toggleSnap = () => {
    this.setState({
      isEnable: !this.state.isEnable
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.toggleSnap}>Toogle Snap</button>
        <span>{this.state.isEnable ? 1 : 0}</span>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    canvasReady: state.renderer.canvasReady
  };
};
const SnapPlugin = connect(
  mapStateToProps,
  null
)(Snap);

// let's export the plugin and a set of required reducers
module.exports = {
  Snap: SnapPlugin
};
