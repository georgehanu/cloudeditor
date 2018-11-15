import React, { Component } from "react";
import { withNamespaces } from "react-i18next";

class UploadImage extends Component {
  selectUploadFileHandler = event => {
    if (
      event.target.files[0] === null ||
      event.target.files[0] === "undefined"
    ) {
      return;
    }
    console.log("IMAGE");

    //this.props.addImageToGallery({ name: event.target.files[0].name });
    event.target.value = null;
  };

  render() {
    return (
      <React.Fragment>
        <div className="UploadFileInputs">
          <label htmlFor="image-file-upload" className="UploadLabel">
            <span className="UploadMessage">
              {this.props.t("Upload Your Image")}
            </span>
          </label>
          <input
            type="file"
            id="image-file-upload"
            className="UploadFormInput"
            onChange={this.selectUploadFileHandler}
            accept="image/*"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withNamespaces("designAndGo")(UploadImage);
