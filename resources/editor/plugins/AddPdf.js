import React from "react";
import { connect } from "react-redux";
import assign from "object-assign";
import { withNamespaces } from "react-i18next";

import { uploadedPdfsSelector } from "../stores/selectors/ui";
import { addPdfToGallery, removePdfFromGallery } from "../stores/actions/ui";

import Jam1 from "../assets/default/designAndGo/Jam1.png";
import Jam2 from "../assets/default/designAndGo/Jam2.png";
import Jam3 from "../assets/default/designAndGo/Jam3.png";

import Gallery from "../components/addImage/Gallery/Gallery";

const galleryImgs = [Jam1, Jam2, Jam3];

class AddPdf extends React.Component {
  // needed for Loading spinner
  state = {};

  selectUploadFileHandler = event => {
    if (
      event.target.files[0] === null ||
      event.target.files[0] === "undefined"
    ) {
      return;
    }
    console.log("PDFFFF");

    this.props.addPdfToGallery({ name: event.target.files[0].name });
    event.target.value = null;
  };

  deleteImageHandler = id => {
    if (id === undefined) return;

    this.props.removePdfFromGallery({ id });
  };

  selectImageHandler = index => {};

  render() {
    let items = galleryImgs;
    if (this.props.uploadedPdfs.length > 0) {
      items = this.props.uploadedPdfs;
    }
    return (
      <div className="UploadContainer">
        <div className="UploadFileInputs">
          <label htmlFor="pdf-file-upload" className="UploadLabel">
            <span className="UploadIcon icon printqicon-upload" />
            <span className="UploadMessage">
              {this.props.t("Upload your own")}
            </span>
          </label>
          <input
            type="file"
            id="pdf-file-upload"
            className="UploadFormInput"
            onChange={this.selectUploadFileHandler}
            accept="image/*"
          />
        </div>
        <div className="UploadDescription">
          {this.props.t("Select and insert the pdf")}
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
    uploadedPdfs: uploadedPdfsSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPdfToGallery: image => dispatch(addPdfToGallery(image)),
    removePdfFromGallery: id => dispatch(removePdfFromGallery(id))
  };
};

const AddPdfPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces("addPdf")(AddPdf));

module.exports = {
  AddPdf: assign(AddPdfPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 5,
      priority: 1,
      text: "Pdf",
      icon: "printqicon-layouts",
      showMore: true,
      tooltip: { title: "Add Pdf", description: "Add a new pdf block" }
    }
  }),
  reducers: { ui: require("../stores/reducers/ui") }
};
