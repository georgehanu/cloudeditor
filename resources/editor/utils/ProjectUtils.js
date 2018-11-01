const uuidv4 = require("uuid/v4");

const getProjectTemplate = cfg => {
  const project = {
    title: (cfg && cfg.title) || "Empty Project",
    pages: {},
    pagesOrder: [],
    activePage: null,
    objects: {},
    selectedObjectsIds: [],
    activeSelection: null
  };
  return project;
};

const getProjectPageTemplate = cfg => {
  return {
    id: uuidv4(),
    width: (cfg && cfg.width) || 1080,
    height: (cfg && cfg.height) || 1080,
    objectsIds: [],
    background: {
      type: "color"
    }
  };
};

/**
 *
 * @param cfg
 * @returns {{title: (*|string), pages: {}, pagesOrder: Array, activePage: null, objects: {}, selectedObjectsIds: Array}}
 */
const getEmptyProject = cfg => {
  let project = getProjectTemplate(cfg);
  const emptyPage = getEmptyPage(cfg);
  return {
    ...project,
    pages: {
      [emptyPage.id]: emptyPage
    },
    pagesOrder: [emptyPage.id],
    activePage: emptyPage.id
  };
};

const getRandomProject = cfg => {
  const defaultImages = [
    "http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg",
    "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350",
    "http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg",
    "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg",
    "https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/04/jonathan-martin-brunate-lead-image_0.jpg",
    "https://www.evoke-landscape-design.co.uk/wp-content/uploads/home-tree.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnln4X6Wha8vlaJMTkL3KEK2_v3Hxov3RqLJ5EZgJc3LbS47IG",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XeKxMs9AQOlzv0IxEF3mjc9wkGw0HNMPmCq8Scf9JHZcxqL7hQ"
  ];
  let project = getProjectTemplate(cfg);
  let page1 = getProjectPageTemplate(cfg);
  let page2 = getProjectPageTemplate(cfg);
  let page3 = getProjectPageTemplate(cfg);

  let img1 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    orientation: "north",
    top: Math.random() * 500,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img2 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500,
    orientation: "north",
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img6 = getEmptyObject({
    type: "image",
    width: 100,
    height: 100,
    left: -250,
    top: -250,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img7 = getEmptyObject({
    type: "image",
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let group = getEmptyObject({
    type: "group",
    width: 500,
    height: 500,
    left: 400,
    top: 400,
    _objectsIds: [img6.id, img7.id]
  });

  let img3 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500,
    orientation: "north",
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img4 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500,
    orientation: "north",
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img5 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    orientation: "north",
    top: Math.random() * 500,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let text6 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    orientation: "north",
    top: Math.random() * 500,
    value: "this is a default value for text"
  });

  page1 = {
    ...page1,
    objectsIds: [img1.id, img2.id, img3.id, group.id]
  };

  page2 = {
    ...page2,
    objectsIds: []
  };
  return {
    ...project,
    pages: {
      [page1.id]: page1,
      [page2.id]: page2,
      [page3.id]: page3
    },
    objects: {
      [img1.id]: img1,
      [img2.id]: img2,
      [img3.id]: img3,
      [img6.id]: img6,
      [img7.id]: img7,
      [group.id]: group
    },
    pagesOrder: [page1.id, page2.id],
    activePage: page1.id
  };
};

/**
 *
 * @param cfg
 * @returns {{id: *, width: (*|number), height: (*|number), objectsIds: Array, background: {type: string}}}
 */
const getEmptyPage = cfg => {
  return getProjectPageTemplate(cfg);
};

const getEmptyObject = cfg => {
  let object = {
    id: uuidv4(),
    type: cfg.type || false,
    width: cfg.width || 500,
    height: cfg.height || 500,
    left: cfg.left || 500,
    top: cfg.top || 500,
    editable: cfg.editable || 1,
    value: cfg.value || "default value",
    resizable: cfg.resizable || 1,
    rotatable: cfg.rotatable || 1,
    movable: cfg.movable || 1,
    orientation: cfg.orientation || "north",
    angle: 0
  };

  if (cfg && cfg.type) {
    switch (cfg.type) {
      case "image":
        return {
          ...object,
          src:
            cfg.src ||
            "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg",
          cropX: 0,
          cropY: 0,
          cropWidth: 0,
          cropHeight: 0
        };
      case "textbox":
        return {
          ...object,
          type: "textbox",
          width: cfg.width || 0,
          height: cfg.height || 0,
          left: cfg.width || 500,
          top: cfg.top || 500,
          fontSize: cfg.fontSize || 20,
          text: cfg.text || "Lorem Ipsum"
        };
      case "activeSelection":
        return { ...object, type: cfg.type, left: cfg.left, top: cfg.top };
      case "group":
        return {
          ...object,
          type: cfg.type,
          width: cfg.width || 500,
          height: cfg.height || 500,
          left: cfg.left || 500,
          top: cfg.top || 500,
          _objectsIds: cfg._objectsIds || []
        };
        break;
      case "text":
      case "textflow":
        return {
          ...object,
          font: cfg.font || "Arial",
          alignment: cfg.alignment || "left",
          valignment: cfg.valignment || "top",
          font_size: cfg.font_size || "top"
        };
        break;
      default:
        return {
          ...object
        };
        break;
    }
  }
};

const ProjectUtils = {
  getEmptyProject,
  getRandomProject,
  getEmptyPage,
  getEmptyObject
};

module.exports = ProjectUtils;
