import React from "react";

const Gallery = props => {
  const items = props.items.map((el, index) => {
    return (
      <li className="UploadGalleryLi" key={index}>
        <div className="UploadGalleryItem">
          <img src={el} alt="GalleryItem" className="UploadGalleryItemImage" />
          <div className="GalleryItemActions">
            <span
              className="Select icon printqicon-ok"
              onClick={() => props.selectImage(el.id)}
            />
            <span
              className="Delete icon printqicon-delete"
              onClick={() => props.deleteImage(el.id)}
            />
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="UploadGallery">
      <ul className="UploadGalleryUl">{items}</ul>
    </div>
  );
};

export default Gallery;
