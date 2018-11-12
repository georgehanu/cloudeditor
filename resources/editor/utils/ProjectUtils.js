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
    //"http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg",
    "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg",
    //"https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350",
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
    width: 343.16999999999996,
    height: 921.4480733944953,
    left: Math.random() * 500,
    orientation: "north",
    top: Math.random() * 500,
    src:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350"
  });

  let text1 = getEmptyObject({
    type: "textbox",
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    text: "Enter text here",
    fill: "red"
  });

  let graphics = getEmptyObject({
    type: "graphics",
    width: Math.random() * 500,
    height: 400,
    left: 150,
    top: 200,
    src: "http://localhost:8080/alfa006_top.svg"
  });

  page1 = {
    ...page1,
    objectsIds: [img1.id, text1.id]
  };

  page2 = {
    ...page2,
    objectsIds: []
  };
  return {
    ...project,
    pages: { [page1.id]: page1, [page2.id]: page2, [page3.id]: page3 },
    objects: {
      [img1.id]: img1,
      [text1.id]: text1
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
    rotateAngle: cfg.rotateAngle || 0,
    ispSnap: cfg.ispSnap || 1,
    orientation: cfg.orientation || "north",
    rotate: cfg.rotate || 0,
    angle: 0
  };

  if (cfg && cfg.type) {
    switch (cfg.type) {
      case "image":
        return {
          ...object,
          cropH: 0,
          cropW: 12,
          cropX: 538,
          cropY: 0,
          alternateZoom: 0,
          leftSlider: 69,
          src:
            "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350"
        };
      case "graphics":
        return {
          ...object,
          src:
            cfg.src ||
            "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
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
          font_size: cfg.font_size || "top",
          bold: cfg.bold || false,
          underline: cfg.underline || false,
          italic: cfg.italic || false
        };
        break;
      default:
        return { ...object };
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
