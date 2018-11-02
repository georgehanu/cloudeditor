const React = require("react");
const FabricRenderer = require("../reconciler/index");
import { setCanvas } from "../../../../globals";
const { createElement } = require("../utils/createElement");
const logger = require("../../../../utils/LoggerUtils");

class Fabric extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this._stage = createElement("Canvas", this.props, this.canvasRef.current);

    setCanvas(this._stage.instance);
    this.props.canvasReadyHandler(true);
    window.canvas = this._stage.instance;
    this._mountNode = FabricRenderer.createContainer(this._stage);

    FabricRenderer.updateContainer(this.props.children, this._mountNode, this);
  }

  componentDidUpdate(prevProps, prevState) {
    logger.info("componentDidUpdate");
    this._stage._applyProps(this.props, prevProps);

    FabricRenderer.updateContainer(this.props.children, this._mountNode, this);
  }
  componentWillUnmount() {
    FabricRenderer.updateContainer(null, this._mountNode, this);
    this._stage.destroy();
  }

  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <canvas ref={this.canvasRef} />
      </React.Fragment>
    );
  }
}

module.exports = Fabric;
