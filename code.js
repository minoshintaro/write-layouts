let message = 'Done!';
let props = {
  flexDirection: 'NONE',
  justifyContent: 'MIN',
  gap: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
}
const changeArray = string => string.split(/\s/);
const changeNumber = string => Number(string.replace(/[^0-9]/g, ''));

for(const target of figma.currentPage.selection) {
  if('layoutMode' in target) {
    const nameList = changeArray(target.name);

    nameList.forEach(item => {
      if(changeNumber(item)) {
        if(item.match(/^g-/)) {
          props.gap = changeNumber(item);
        } else if(item.match(/^p-/) || item.match(/^py-/) || item.match(/^pt-/)) {
          props.paddingTop = changeNumber(item);
        } else if(item.match(/^p-/) || item.match(/^py-/) || item.match(/^pb-/)) {
          props.paddingBottom = changeNumber(item);
        } else if(item.match(/^p-/) || item.match(/^px-/) || item.match(/^pl-/)) {
          props.paddingLeft = changeNumber(item);
        } else if(item.match(/^p-/) || item.match(/^px-/) || item.match(/^pr-/)) {
          props.paddingRight = changeNumber(item);
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

    target.layoutMode = props.flexDirection;
    target.primaryAxisAlignItems = props.justifyContent;
    target.itemSpacing = props.gap;
    target.paddingTop = props.paddingTop;
    target.paddingBottom = props.paddingBottom;
    target.paddingLeft = props.paddingLeft;
    target.paddingRight = props.paddingRight;
  }
}

figma.closePlugin(message);
