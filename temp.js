const message = 'Done!';
const changeArray = string => string.split(/\s/);
const changeNumber = string => Number(string.replace(/[^0-9]/g, ''));

for(const target of figma.currentPage.selection) {
  const nameList = changeArray(target.name);

  if('layoutMode' in target) {
    nameList.forEach(item => {
      if(item === 'row') {
        target.layoutMode = 'HORIZONTAL';
      }
      if(item === 'col' || item === 'stack') {
        target.layoutMode = 'VERTICAL';
      }
    });
  }

  if(target.layoutMode !== 'NONE') {
    nameList.forEach(item => {
      if(item === 'g-auto') {
        target.primaryAxisAlignItems = 'SPACE_BETWEEN';
      } else if(item.match(/^g-/) && changeNumber(item)) {
        target.itemSpacing = changeNumber(item);
      } else {
        target.itemSpacing = 0;
      }

      if(item.match(/^p-/) || item.match(/^py-/) || item.match(/^pt-/) && changeNumber(item)) {
        target.paddingTop = changeNumber(item);
      } else {
        target.paddingTop = 0;
      }

      if(item.match(/^p-/) || item.match(/^py-/) || item.match(/^pb-/) && changeNumber(item)) {
				target.paddingBottom = changeNumber(item);
      } else {
        target.paddingBottom = 0;
      }

      if(item.match(/^p-/) || item.match(/^px-/) || item.match(/^pl-/) && changeNumber(item)) {
				target.paddingLeft = changeNumber(item);
      } else {
        target.paddingLeft = 0;
      }

      if(item.match(/^p-/) || item.match(/^px-/) || item.match(/^pr-/) && changeNumber(item)) {
				target.paddingRight = changeNumber(item);
      } else {
        target.paddingRight = 0;
      }
    });
  }
}
figma.closePlugin(message);
