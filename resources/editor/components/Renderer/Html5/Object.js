const React = require("react");
const randomColor = require("randomcolor");
require("webpack-jquery-ui/draggable");
require("webpack-jquery-ui/resizable");

class ObjectBlock extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const element = this.el.current;
    if (element) {
      console.log(element);
      $(element)
        .draggable({
          stop: (event, ui) => {
            this.props.onDragStop({
              id: this.props.id,
              top: ui.position.top / this.props.scale,
              left: ui.position.left / this.props.scale
            });
          }
        })
        .resizable({
          stop: (event, ui) => {
            this.props.onResizeStop({
              id: this.props.id,
              width: ui.size.width / this.props.scale,
              height: ui.size.height / this.props.scale
            });
          }
        });
    }
  }

  render() {
    const { width, height, top, left, ...otherProps } = this.props;
    const style = {
      width: width,
      height: height,
      left: left,
      top: top,
      position: "absolute",
      backgroundColor: randomColor()
    };
    return (
      <div className="page-block" style={style} ref={this.el}>
        <div className="rotatable-handle">R</div>
      </div>
    );
  }
}

module.exports = ObjectBlock;

// const objectBlock = React.forwardRef((props, ref) => {
//   console.log(ref, props);
//   const { width, height, top, left, ...otherProps } = props;
//   const style = {
//     width: width,
//     height: height,
//     left: left,
//     top: top,
//     backgroundColor: randomColor()
//   };
//   return (
//     <div
//       className="page-block"
//       style={style}
//       onClick={props.onClick}
//       ref={ref}
//     />
//   );
// });

// module.exports = Drr(objectBlock);
