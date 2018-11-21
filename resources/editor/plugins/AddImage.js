import React from "react";
import { connect } from "react-redux";
import assign from "object-assign";
import { withNamespaces } from "react-i18next";

import { uploadedImagesSelector } from "../stores/selectors/ui";
import {
  addImageToGallery,
  removeImageFromGallery
} from "../stores/actions/ui";

import Jam1 from "../assets/default/designAndGo/Jam1.png";
import Jam2 from "../assets/default/designAndGo/Jam2.png";
import Jam3 from "../assets/default/designAndGo/Jam3.png";

import Gallery from "../components/addImage/Gallery/Gallery";

const galleryImgs = [Jam1, Jam2, Jam3];

class AddImage extends React.Component {
  // needed for Loading spinner
  state = {};

  selectUploadFileHandler = event => {
    if (
      event.target.files[0] === null ||
      event.target.files[0] === "undefined"
    ) {
      return;
    }

    this.props.addImageToGallery({ name: event.target.files[0].name });
    event.target.value = null;
  };

  deleteImageHandler = id => {
    if (id === undefined) return;

    this.props.removeImageFromGallery({ id });
  };

  selectImageHandler = index => {};

  render() {
    let items = galleryImgs;
    if (this.props.uploadedImages.length > 0) {
      items = this.props.uploadedImages;
    }
    return (
      <div className="UploadContainer">
        <div className="UploadFileInputs">
          <label htmlFor="image-file-upload" className="UploadLabel">
            <span className="UploadIcon icon printqicon-upload" />
            <span className="UploadMessage">
              {this.props.t("Upload your own")}
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
        <div className="UploadDescription">
          {this.props.t("Select and insert the image")}
        </div>

        <Gallery
          items={items}
          deleteImage={this.deleteImageHandler}
          selectImage={this.selectImageHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uploadedImages: uploadedImagesSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addImageToGallery: image => dispatch(addImageToGallery(image)),
    removeImageFromGallery: id => dispatch(removeImageFromGallery(id))
  };
};

AddImage.defaultProps = {
  id: "addImage-wrapper"
};

const AddImagePlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces("addImage")(AddImage));

module.exports = {
  AddImage: assign(AddImagePlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 3,
      priority: 1,
      text: "Add Image",
      icon: "printqicon-newimage",
      showMore: true,
      tooltip: { title: "Add Image", description: "Add a new image block" }
    }
  }),
  reducers: { ui: require("../stores/reducers/ui") }
};
