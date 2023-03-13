let message = 'Auto Layout!';

const changeStringToArray = string => string.split(/\s/);
const changeStringToNumber = string => Number(string.replace(/[^0-9]/g, ''));
const checkListHasKey = (list, keys) => {
  return keys.filter(key => list.includes(key));
}
const getNodeList = target => {
  return target.findAllWithCriteria({
    types: ['FRAME']
  });
};

function editFrameProps(frame) {
  let props = {
    flexDirection: 'NONE',
    justifyContent: 'MIN',
    gap: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  }

  const nameList = changeStringToArray(frame.name);

  nameList.forEach(item => {
    if(changeStringToNumber(item)) {
      const pixelValue = changeStringToNumber(item);
      if(item.match(/^g-/)) {
        props.gap = pixelValue;
      } else if(item.match(/^p-/)) {
        props.paddingTop = pixelValue;
        props.paddingBottom = pixelValue;
        props.paddingLeft = pixelValue;
        props.paddingRight = pixelValue;
      } else if(item.match(/^py-/)) {
        props.paddingTop = pixelValue;
        props.paddingBottom = pixelValue;
      } else if(item.match(/^px-/)) {
        props.paddingLeft = pixelValue;
        props.paddingRight = pixelValue;
      } else if(item.match(/^pt-/)) {
        props.paddingTop = pixelValue;
      } else if(item.match(/^pb-/)) {
        props.paddingBottom = pixelValue;
      } else if(item.match(/^pl-/)) {
        props.paddingLeft = pixelValue;
      } else if(item.match(/^pr-/)) {
        props.paddingRight = pixelValue;
      }
    } else {
      if(item === 'row' || item === 'flex') {
        props.flexDirection = 'HORIZONTAL';
      } else if(item === 'col' || item === 'stack') {
        props.flexDirection = 'VERTICAL';
      } else if(item === 'g-auto') {
        props.justifyContent = 'SPACE_BETWEEN';
      }
    }
  });

  if(checkListHasKey(nameList, ['row', 'col', 'flex', 'stack'])) {
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
  if(targetLayer.type === 'FRAME' || targetLayer.type === 'COMPONENT') {
    editFrameProps(targetLayer);

    for(const node of getNodeList(targetLayer)) {
      editFrameProps(node);
    }
  } else {
    message = 'Run only Frames or Components';
  }
}

figma.closePlugin(message);
