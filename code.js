let message;
let state = {
  autoLayout: false,
  resizing: false
};

const keys = {
  row: ['row', 'flex'],
  column: ['col', 'stack'],
  justification: ['g-auto'],
  gap: /^g-/,
  padding: /^p-/,
  paddingBlock: /^py-/,
  paddingInline: /^px-/,
  paddingTop: /^pt-/,
  paddingBottom: /^p-/,
  paddingLeft: /^pl-/,
  paddingRight: /^pr-/,
  width: /^w-/,
  aspectRatio: /^[0-9]{1,2}x[0-9]{1,2}$/
};

const convertStringToArray = string => string.split(/\s/);
const convertStringToNumber = string => Number(string.replace(/[^0-9]/g, ''));
const getNodeList = target => target.findAllWithCriteria({ types: ['FRAME'] });

function editAutoLayoutProps(frame) {
  let props = {
    flexDirection: frame.layoutMode,
    justifyContent: frame.primaryAxisAlignItems,
    aliginItems: frame.counterAxisAlignItems,
    mainSizng: frame.primaryAxisSizingMode,
    subSizing: frame.counterAxisSizingMode,
    gap: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  }

  const nameList = convertStringToArray(frame.name);
  nameList.forEach(item => {
    const pixelValue = convertStringToNumber(item);
    if(pixelValue) {
      if(item.match(keys.gap)) {
        props.gap = pixelValue;
      } else if(item.match(keys.padding)) {
        props.paddingTop = pixelValue;
        props.paddingBottom = pixelValue;
        props.paddingLeft = pixelValue;
        props.paddingRight = pixelValue;
      } else if(item.match(keys.paddingBlock)) {
        props.paddingTop = pixelValue;
        props.paddingBottom = pixelValue;
      } else if(item.match(keys.paddingInline)) {
        props.paddingLeft = pixelValue;
        props.paddingRight = pixelValue;
      } else if(item.match(keys.paddingTop)) {
        props.paddingTop = pixelValue;
      } else if(item.match(keys.paddingBottom)) {
        props.paddingBottom = pixelValue;
      } else if(item.match(keys.paddingLeft)) {
        props.paddingLeft = pixelValue;
      } else if(item.match(keys.paddingRight)) {
        props.paddingRight = pixelValue;
      }
    } else {
      if(item === keys.row[0] || item === keys.row[1]) {
        props.flexDirection = 'HORIZONTAL';
        state.autoLayout = true;
      } else if(item === keys.column[0] || item === keys.column[1]) {
        props.flexDirection = 'VERTICAL';
        state.autoLayout = true;
      } else if(item === keys.justification[0]) {
        props.justifyContent = 'SPACE_BETWEEN';
      }
    }
  });

  if(state.autoLayout) {
    frame.layoutMode = props.flexDirection;
    frame.primaryAxisAlignItems = props.justifyContent;
    frame.itemSpacing = props.gap;
    frame.paddingTop = props.paddingTop;
    frame.paddingBottom = props.paddingBottom;
    frame.paddingLeft = props.paddingLeft;
    frame.paddingRight = props.paddingRight;
  }

  console.log(props);
}

function editSizeProps(frame) {
  let props = {
    width: frame.width,
    height: frame.height,
  };

  const nameList = convertStringToArray(frame.name);
  nameList.forEach(item => {
    if(item.match(keys.width)) {
      props.width = convertStringToNumber(item);
      state.resizing = true;
    }
  });
  nameList.forEach(item => {
    if(item.match(keys.aspectRatio)) {
      const ratio = item.split('x').map(Number);
      props.height = Math.trunc(props.width * ratio[1] / ratio[0]);
      state.resizing = true;
    }
  });

  if(state.resizing) {
    frame.resizeWithoutConstraints(props.width, props.height);
  }

  console.log(props);
}

for(const targetLayer of figma.currentPage.selection) {
  if(targetLayer.type === 'FRAME' || targetLayer.type === 'COMPONENT') {
    editAutoLayoutProps(targetLayer);
    for(const node of getNodeList(targetLayer)) {
      editAutoLayoutProps(node);
    }
  }
  if(targetLayer.type === 'FRAME' || targetLayer.type === 'COMPONENT' || targetLayer.type === 'INSTANCE' || targetLayer.type === 'RECTANGLE' ) {
    editSizeProps(targetLayer);
  }
}

if(state.autoLayout && state.resizing) {
  message = 'Auto Layout and Resizing';
} else if(state.autoLayout) {
  message = 'Auto Layout';
} else if(state.resizing) {
  message = 'Resizing';
} else {
  message = 'No change :-)';
}

figma.closePlugin(message);
