const uuidv4 = require("uuid/v4");
const { merge, mergeAll, pathOr } = require("ramda");

const getObjectColorTemplate = cfg => {
  return merge(
    {
      colorSpace: "DeviceRGB",
      transparent: 1,
      htmlRGB: null,
      RGB: null,
      CMYK: null,
      separation: null,
      separationColorSpace: null,
      separationColor: null
    },
    cfg || {}
  );
};

const getObjectsDefaults = cfg => {
  const { general, image, text, pdf, qr, ...custom } = cfg || {};
  const generalCfg = merge(
    {
      editable: 1, //user can edit a block
      ignoreOnRest: 0, //this block will be ignored on rest
      onTop: 0, //specify if a block is on top
      required: 0, //user must specify a value for this block
      movable: 1, //can be moved
      resizable: 1, //user can resize this block
      rotatable: 1, //user can rotate this block
      rotateAngle: 0, // rotation angle of the block in deg
      snapable: 0, // if snap is allow or not
      tetha: 0, //this is rotation angle in radians for translate rotation in PDF
      visible: 1, //if false, a block is NOT visible in the editor, but visible in PDF
      orientate: "north", //PDFLIB orientation - not used
      opacity: 1, // opacity of the block
      realType: null, //specifies what is the real type of the block(image, pdf, qr, )
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      bgColor: getObjectColorTemplate(general.bgColor || {}),
      borderColor: getObjectColorTemplate(general.borderColor || {}),
      borderWidth: 0
    },
    general || {}
  );

  const imageCfg = merge(
    {
      type: "image",
      realType: "image",
      alternateZoom: 0,
      backgroundBlock: 0,
      borderWidth: 0,
      contrast: 0,
      luminosite: 0,
      flipHorizontal: 0,
      flipVertical: 0,
      flipBoth: 0,
      greyscale: 0,
      invert: 0,
      sepia: 0,
      leftSlider: 0,
      localImages: 0,
      selectBox: 0,
      src: 0
    },
    image || {}
  );
  const pdfCfg = mergeAll([
    image,
    {
      realType: "pdf"
    },
    pdf || {}
  ]);

  const qrCfg = mergeAll([
    image,
    {
      realType: "qr"
    },
    qr || {}
  ]);

  const textCfg = merge(
    {
      alignment: "center",
      bold: 0,
      charSpacing: 0,
      circleText: 0,
      fillColor: getObjectColorTemplate(text.fillColor || {}),
      deviationX: 0,
      deviationY: 0,
      fontId: 1,
      fontSize: 24,
      italic: 0,
      lineHeightN: 120,
      lineHeightP: false,
      maxLength: 0,
      prefix: "",
      sufix: "",
      type: "text",
      underline: 0,
      vAlignment: "middle",
      wordSpacing: 0,
      value: "Edit Text Here"
    },
    text || {}
  );

  const customCfg = custom || {};

  return {
    generalCfg,
    imageCfg,
    pdfCfg,
    qrCfg,
    textCfg,
    ...customCfg
  };
};

const getDocumentDefaults = cfg => {
  const defaults = merge(
    {
      facingPages: false
    },
    cfg || {}
  );
  return defaults;
};

const getPagesDefaults = cfg => {
  const defaults = merge(
    {
      width: 1080,
      height: 1080,
      boxes: merge(
        {
          trimbox: merge(
            {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            pathOr({}, ["boxes", "trimbox"], cfg)
          ),
          bleed: merge(
            {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            pathOr({}, ["boxes", "bleed"], cfg)
          )
        },
        (cfg && cfg.boxes) || {}
      )
    },
    cfg || {}
  );
  return defaults;
};

const getProjectTemplate = cfg => {
  const project = {
    title: (cfg && cfg.title) || "Empty Project",
    pages: {},
    pagesOrder: [],
    activePage: null,
    objects: {},
    selectedObjectsIds: [],
    configs: {
      document: getDocumentDefaults(
        (cfg && cfg.defaults && cfg.defaults.document) || {}
      ),
      pages: getPagesDefaults(
        (cfg && cfg.defaults && cfg.defaults.pages) || {}
      ),
      objects: getObjectsDefaults(
        (cfg && cfg.defaults && cfg.defaults.objects) || {}
      )
    },
    colors: {},
    fonts: {},
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

const getColorTemplate = cfg => {
  return merge(
    {
      id: uuidv4(),
      label: null, //label of the color
      htmlRGB: null, //html value of the color
      RGB: null, //pdflib RGB value
      CMYK: null, //pdflib CMYK value
      separation: null, // pdflib Separation color value
      separationColorSpace: null, //fallback for separation color
      separationColor: null //fallback for separation color
    },
    cfg || {}
  );
};

const getFontTemplate = cfg => {
  return merge(
    {
      id: uuidv4(),
      label: null, //label of the color
      font: null,
      icon: null
    },
    cfg || {}
  );
};

const getEmptyFont = cfg => {
  return getFontTemplate(cfg);
};

const getEmptyColor = cfg => {
  return getColorTemplate(cfg);
};

const getFontMetricTemplate = cfg => {
  return merge(
    {
      cb: null,
      emSize: null,
      hhAscent: null,
      hhDescent: null,
      ir: null,
      typoAscent: null,
      winAscent: null,
      winDescent: null
    },
    cfg || {}
  );
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
    width: 200,
    height: 200,
    left: 0,
    top: 0,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img2 = getEmptyObject({
    type: "image",
    width: 150,
    height: 150,
    left: 300,
    top: 300,
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
    width: 50,
    height: 50,
    left: 350,
    top: 0,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img4 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let img5 = getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500,
    src: defaultImages[parseInt(Math.random() * defaultImages.length)]
  });
  let text1 = getEmptyObject({
    type: "text",
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    text: "Enter text here",
    bold: true,
    italic: false,
    underline: true
  });

  page1 = {
    ...page1,
    objectsIds: [img1.id, img2.id, img3.id, group.id, text1.id]
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
      [group.id]: group,
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
    type: false,
    angle: 0
  };

  if (cfg && cfg.type) {
    switch (cfg.type) {
      case "image":
        return {
          ...object,
          type: cfg.type,
          width: cfg.width,
          height: cfg.height,
          left: cfg.left,
          top: cfg.top,
          src:
            cfg.src ||
            "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
        };
      case "activeSelection":
        return {
          ...object,
          type: cfg.type,
          left: cfg.left,
          top: cfg.top
        };
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
      case "text":
        return {
          ...object,
          type: cfg.type,
          width: cfg.width,
          height: cfg.height,
          left: cfg.left,
          top: cfg.top,
          text: cfg.text || "Default text",
          bold: cfg.bold || false,
          underline: cfg.underline || false,
          italic: cfg.italic || false,
          fill: cfg.fill || "black",
          charSpacing: cfg.charSpacing || 1,
          fontSize: cfg.fontSize || 60,
          fontFamily: cfg.fontFamily || "Times New Roman"
        };
      default:
        break;
    }
  }
};

const getEmptyUI = cfg => {
  return {
    colors: {},
    fonts: {},
    fontMetrics: {},
    workArea: {
      zoom: 1,
      scale: 1,
      pageOffset: {
        x: 0,
        y: 0
      }
    }
  };
};

const getRandomUI = cfg => {
  const ui = getEmptyUI(cfg);
  const color1 = getEmptyColor({ id: 1, label: "white", htmlRGB: "#fff" });
  const color2 = getEmptyColor({ id: 2, label: "red", htmlRGB: "#f00" });
  const font1 = getEmptyFont({ label: "Helvetica", id: 1 });
  const font2 = getEmptyFont({ label: "Arial", id: 2 });

  return {
    ...ui,
    colors: {
      ...ui.colors,
      [color1.id]: color1,
      [color2.id]: color2
    },
    fonts: {
      ...ui.fonts,
      [font1.id]: font1,
      [font2.id]: font2
    }
  };
};

const ProjectUtils = {
  getEmptyProject,
  getRandomProject,
  getEmptyPage,
  getEmptyObject,
  getEmptyUI,
  getRandomUI,
  getEmptyColor,
  getEmptyFont
};

module.exports = ProjectUtils;
