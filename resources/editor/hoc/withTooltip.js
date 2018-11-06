import React from "react";
import ReactTooltip from "react-tooltip";
const uuidv4 = require("uuid/v4");

const withTooltip = WrappedComponent => props => {
  let tooltipData = {};
  let elementId = null;

  if (props.tooltip && props.tooltip !== undefined) {
    // we need tooltip data but this requires to bind it to the elementId - create it if it does not exist
    if (props.id === undefined) {
      elementId = uuidv4();
      tooltipData = {
        "data-tip": "true",
        "data-for": elementId,
        id: elementId
      };
    } else {
      elementId = props.id;
      tooltipData = {
        "data-tip": "true",
        "data-for": elementId
      };
    }
  }

  return (
    <React.Fragment>
      <WrappedComponent {...props} tooltipData={tooltipData} />
      {props.tooltip &&
        props.tooltip !== undefined && (
          <ReactTooltip id={elementId} place="bottom">
            <div className="Tooltip">
              {props.tooltip.title ? (
                <React.Fragment>
                  <p className="TooltipTitle">{props.tooltip.title}</p>
                  <p className="TooltipDesc">{props.tooltip.description}</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="TooltipTitle">{props.tooltip}</p>
                </React.Fragment>
              )}
            </div>
          </ReactTooltip>
        )}
    </React.Fragment>
  );
};

export default withTooltip;

/*

 return (props) => (
        <React.Fragment>
            <WrappedComponent {...props} />
            {(props.tooltip && props.tooltip !== undefined) && (
                props.tooltip.title ?
                    <ReactTooltip id={props.id} place="bottom">
                        <div className="Tooltip">
                            <p className="TooltipTitle">{props.tooltip.title}</p>
                            <p className="TooltipDesc">{props.tooltip.description}</p>
                        </div>
                    </ReactTooltip>
                    :
                    <ReactTooltip id={props.id} place="bottom">
                        <div className="Tooltip">
                            <p className="TooltipTitle">{props.tooltip}</p>
                        </div>
                    </ReactTooltip>
            )}
        </React.Fragment>
    )
    









    <React.Fragment>
            <WrappedComponent {...props} />
            {(props.tooltip && props.tooltip !== undefined) && (
                <ReactTooltip id={props.id} place="bottom">
                    <div className="Tooltip">
                        {props.tooltip.title &&
                            <React.Fragment>
                                <p className="TooltipTitle">{props.tooltip.title}</p>
                                <p className="TooltipDesc">{props.tooltip.description}</p>
                            </React.Fragment>
                        }
                        {props.tooltip.title === undefined &&
                            <React.Fragment>
                                <p className="TooltipTitle">{props.tooltip}</p>
                            </React.Fragment>
                        }
                    </div>
                </ReactTooltip>
            )}
        </React.Fragment>
    */
