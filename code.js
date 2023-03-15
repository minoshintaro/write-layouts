let message = 'Write Layouts :-)';

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

function editSizeProps(frame) {
  let props = {
    width: frame.width,
    height: frame.height,
  };
  let cue = false;

  const nameList = convertStringToArray(frame.name);
  nameList.forEach(item => {
    if(item.match(keys.width)) {
      props.width = convertStringToNumber(item);
      cue = true;
    }
  });
  nameList.forEach(item => {
    if(item.match(keys.aspectRatio)) {
      const ratio = item.split('x').map(Number);
      props.height = Math.trunc(props.width * ratio[1] / ratio[0]);
      cue = true;
    }
  });

  if(cue) {
    frame.resizeWithoutConstraints(props.width, props.height);
  }
}

function editAutoLayoutProps(frame) {
  let props = {
    flexDirection: 'NONE',
    justifyContent: 'MIN',
    gap: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
  let cue = false;

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
        cue = 'x';
      } else if(item === keys.column[0] || item === keys.column[1]) {
        props.flexDirection = 'VERTICAL';
        cue = 'y';
      } else if(item === keys.justification[0]) {
        props.justifyContent = 'SPACE_BETWEEN';
      }
    }
  });

  if(cue) {
    frame.layoutMode = props.flexDirection;
    frame.primaryAxisAlignItems = props.justifyContent;
    frame.itemSpacing = props.gap;
    frame.paddingTop = props.paddingTop;
    frame.paddingBottom = props.paddingBottom;
    frame.paddingLeft = props.paddingLeft;
    frame.paddingRight = props.paddingRight;
  }
}

for(const targetLayer of figma.currentPage.selection) {
  if(targetLayer.type === 'FRAME' || targetLayer.type === 'COMPONENT' || targetLayer.type === 'INSTANCE' || targetLayer.type === 'RECTANGLE' ) {
    editSizeProps(targetLayer);
  }
  if(targetLayer.type === 'FRAME' || targetLayer.type === 'COMPONENT') {
    editAutoLayoutProps(targetLayer);
    for(const node of getNodeList(targetLayer)) {
      editAutoLayoutProps(node);
    }
  }
}

figma.closePlugin(message);
