import { getFrameNodeList } from './getFrameNodeList';
import { getSplitNameList } from './getSplitNameList';
import { pattern } from './pattern';

export function setLayerName (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME') {
    for (const node of getFrameNodeList(currentNode)) {
      if ('layoutMode' in node && node.layoutMode !== 'NONE') {
        let props = {
          flexDirection: node.layoutMode,
          justifyContent: node.primaryAxisAlignItems,
          gap: node.itemSpacing,
          paddingTop: node.paddingTop,
          paddingBottom: node.paddingBottom,
          paddingLeft: node.paddingLeft,
          paddingRight: node.paddingRight
        }

        function setGapName (g: number, j: string): string {
          switch (true) {
            case j === 'SPACE_BETWEEN': return 'g-auto';
            case g !== 0 : return 'g-' + g;
            default: return 'NONE';
          }
        }

        function setPaddingName (t: number, b: number, l: number, r: number): string {
          const x = (l !== 0) && (l === r) ? l : 0;
          const y = (t !== 0) && (t === b) ? t : 0;
          const p = (x !== 0) && (x === y) ? x : 0;

          if (p) {
            return 'p-' + p;
          } else if (x && y) {
            return 'px-' + x + ' py-' + y;
          } else if (x) {
            switch (true) {
              case t !== 0 && b !==0: return 'px-' + x + ' pt-' + t + ' pb-' + b;
              case t !== 0 && b ===0: return 'px-' + x + ' pt-' + t;
              case t === 0 && b !==0: return 'px-' + x + ' pb-' + b;
              default: return 'px-' + x;
            }
          } else if (y) {
            switch (true) {
              case l !== 0 && r !==0: return 'py-' + y + ' pl-' + l + ' pr-' + r;
              case l !== 0 && r ===0: return 'py-' + y + ' pl-' + l;
              case l === 0 && r !==0: return 'py-' + y + ' pr-' + r;
              default: return 'py-' + y;
            }
          } else if (t) {
            switch (true) {
              case b !== 0 && l !== 0 && r !== 0: return 'pt-' + t + ' pb-' + b + ' pl-' + l + ' pr-' + r;
              case b !== 0 && l !== 0 && r === 0: return 'pt-' + t + ' pb-' + b + ' pl-' + l;
              case b !== 0 && l === 0 && r !== 0: return 'pt-' + t + ' pb-' + b + ' pr-' + r;
              case b !== 0 && l === 0 && r === 0: return 'pt-' + t + ' pb-' + b;
              case b === 0 && l !== 0 && r !== 0: return 'pt-' + t + ' pl-' + l + ' pr-' + r;
              case b === 0 && l !== 0 && r === 0: return 'pt-' + t + ' pl-' + l;
              case b === 0 && l === 0 && r !== 0: return 'pt-' + t + ' pr-' + r;
              default: return 'pt-' + t;
            }
          } else if (b) {
            switch (true) {
              case l !== 0 && r !== 0: return 'pb-' + b + ' pl-' + l + ' pr-' + r;
              case l !== 0 && r === 0: return 'pb-' + b + ' pl-' + l;
              case l === 0 && r !== 0: return 'pb-' + b + ' pr-' + r;
              default: return 'pb-' + b;
            }
          } else if (l) {
            switch (true) {
              case r !== 0: return 'pl-' + l + ' pr-' + r;
              default: return 'pl-' + l;
            }
          } else if (r) {
            return 'pr-' + r;
          } else {
            return 'NONE'
          }
        }

        const direction = (props.flexDirection === 'HORIZONTAL') ? 'row' : 'col';
        const gap = setGapName(props.gap, props.justifyContent);
        const padding = setPaddingName(props.paddingTop, props.paddingBottom, props.paddingLeft, props.paddingRight);

        const currentNames = getSplitNameList(node).filter(item => {
          switch (item) {
            case 'row': break;
            case 'col': break;
            default: return item.match(pattern.notSpacing);
          }
        });
        const nameList = currentNames.concat(Array(direction, gap, padding));

        node.name = nameList.filter(item => item.match(pattern.notNone)).join(' ');
      }
    }
  } else {
    figma.closePlugin('Not Auto Layout');
  }
}
