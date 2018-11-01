const React = require("react");
const randomColor = require("randomcolor");
require("webpack-jquery-ui/draggable");
require("webpack-jquery-ui/resizable");

class ObjectBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  componentDidMount() {
    const element = this.el.current;
    if (element) {
      console.log(element);
      $(element)
        .draggable()
        .resizable();
    }
  }

  render() {
    const { width, height, top, left, ...otherProps } = this.props;
    const style = {
      width: width,
      height: height,
      left: left,
      top: top,
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
