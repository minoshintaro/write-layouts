import { getFrameNodeList } from "./getFrameNodeList";
import { getSplitNameList } from './getSplitNameList';

export function setLayerName (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {

    for (const node of getFrameNodeList(currentNode)) {
      const props = new Map<string, string>();
      const name = getSplitNameList(node, 'notPropName').join(' ');
      const pt = node.paddingTop;
      const pb = node.paddingBottom;
      const pl = node.paddingLeft;
      const pr = node.paddingRight;
      const px = pl === pr ? pl : 0;
      const py = pt === pb ? pt : 0;
      const p = px === py ? px : 0;
      const width = getSplitNameList(node, 'width').slice(-1).toString();
      const height = getSplitNameList(node, 'height').slice(-1).toString();
      const ratio = getSplitNameList(node, 'ratio').slice(-1).toString();

      if (name) { props.set('name', name); }

      // switch (node.layoutMode) {
      //   case 'HORIZONTAL': {
      //     props.set('direction', 'row');
      //     break;
      //   }
      //   case 'VERTICAL': {
      //     props.set('direction', 'col');
      //     break;
      //   }
      //   default: break;
      // }
      // switch (node.primaryAxisAlignItems) {
      //   case 'SPACE_BETWEEN': {
      //     props.set('gap', 'g-auto');
      //     break;
      //   }
      //   default: {
      //     if (node.itemSpacing !== 0) {
      //       props.set('gap', `g-${node.itemSpacing}`);
      //     }
      //     break;
      //   }
      // }

      if (node.layoutMode === 'HORIZONTAL') {
        props.set('direction', 'row');
      } else if (node.layoutMode === 'VERTICAL') {
        props.set('direction', 'col');
      }

      if (node.primaryAxisAlignItems === 'SPACE_BETWEEN') {
        props.set('gap', 'g-auto');
      } else if (node.itemSpacing !== 0) {
        props.set('gap', `g-${node.itemSpacing}`);
      }

      if (p) { props.set('padding', `p-${p}`); }
      if (!p && px) { props.set('paddingInline', `px-${px}`); }
      if (!p && py) { props.set('paddingBlock', `py-${py}`); }
      if (!py && pt) { props.set('paddingTop', `pt-${pt}`); }
      if (!py && pb) { props.set('paddingBottom', `pb-${pb}`); }
      if (!px && pl) { props.set('paddingLeft', `pl-${pl}`); }
      if (!px && pr) { props.set('paddingRight', `pr-${pr}`); }
      if (width) { props.set('width', width); }
      if (height) { props.set('height', height); }
      if (ratio) { props.set('ratio', ratio); }

      if (props.has('direction')) {
        node.name = [...props.values()].join(' ');
      }
    }
  } else {
    figma.closePlugin('Not Frame');
  }
}
