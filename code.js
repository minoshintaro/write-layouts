let message = 'Auto Layout!';

const changeArray = string => string.split(/\s/);
const changeNumber = string => Number(string.replace(/[^0-9]/g, ''));

function checkNameHasKey(frame) {
  const nameList = changeArray(frame.name);
  nameList.forEach(item => {
    if(item === 'row' || item === 'col' || item === 'stack') {
      return true;
    }
  });
}

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

  const nameList = changeArray(frame.name);

  nameList.forEach(item => {
    if(changeNumber(item)) {
      const pixelValue = changeNumber(item);

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
      if(item === 'row') {
        props.flexDirection = 'HORIZONTAL';
      } else if(item === 'col' || item === 'stack') {
        props.flexDirection = 'VERTICAL';
      } else if(item === 'g-auto') {
        props.justifyContent = 'SPACE_BETWEEN';
      }
    }
  });

  frame.layoutMode = props.flexDirection;
  frame.primaryAxisAlignItems = props.justifyContent;
  frame.itemSpacing = props.gap;
  frame.paddingTop = props.paddingTop;
  frame.paddingBottom = props.paddingBottom;
  frame.paddingLeft = props.paddingLeft;
  frame.paddingRight = props.paddingRight;
}

for(const targetLayer of figma.currentPage.selection) {
  if('layoutMode' in targetLayer) {
    const nodeList = targetLayer.findAllWithCriteria({
      types: ['FRAME']
    });

    editFrameProps(targetLayer);

    for(const node of nodeList) {
      if(checkNameHasKey(node)) {
        editFrameProps(node);
      }
    }
  }
}

figma.closePlugin(message);
