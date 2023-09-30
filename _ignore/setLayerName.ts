import { getFrameNodeList } from "./getFrameNodeList";
import { getSplitNameList } from './getSplitNameList';

export function setLayerName (currentNode: SceneNode): void {
  const type = currentNode.type;
  if (type !== 'FRAME' && type !== 'COMPONENT') return;

  for (const node of getFrameNodeList(currentNode)) {
    const props: {
      inheritedName: string;
      gap: number;
      pt: number;
      pb: number;
      pl: number;
      pr: number;
      width: string;
      height: string;
      ratio: string;
    } = {
      inheritedName: getSplitNameList(node, 'notPropName').join(' '),
      gap: node.itemSpacing,
      pt: node.paddingTop,
      pb: node.paddingBottom,
      pl: node.paddingLeft,
      pr: node.paddingRight,
      width: getSplitNameList(node, 'width').slice(-1)[0],
      height: getSplitNameList(node, 'height').slice(-1)[0],
      ratio: getSplitNameList(node, 'ratio').slice(-1)[0]
    };

    const hasShorthand = (type: string): boolean => {
      const px = (props.pl === props.pr) ? props.pl : 0;
      const py = (props.pt === props.pb) ? props.pt : 0;
      const p = (px === py) ? px : 0;

      switch (type) {
        case 'px': return (!p && px) ? true : false;
        case 'py': return (!p && py) ? true : false;
        case 'p': return p ? true : false;
        default: return false;
      }
    };

    const names = new Map<string, string>();

    if (props.inheritedName) names.set('name', props.inheritedName);

    if (node.layoutMode === 'HORIZONTAL') names.set('direction', 'row');
    if (node.layoutMode === 'VERTICAL') names.set('direction', 'col');

    if (node.primaryAxisAlignItems === 'SPACE_BETWEEN') names.set('gap', 'g-auto');
    if (node.itemSpacing !== 0 && !names.has('gap')) names.set('gap', `g-${props.gap}`);

    if (hasShorthand('p')) {
      names.set('padding', `p-${props.pl}`);
    } else {
      if (hasShorthand('px')) names.set('paddingInline', `px-${props.pl}`);
      if (hasShorthand('py')) names.set('paddingBlock', `py-${props.pt}`);
      if (!hasShorthand('py') && props.pt) names.set('paddingTop', `pt-${props.pt}`);
      if (!hasShorthand('py') && props.pb) names.set('paddingBottom', `pb-${props.pb}`);
      if (!hasShorthand('px') && props.pl) names.set('paddingLeft', `pl-${props.pl}`);
      if (!hasShorthand('px') && props.pr) names.set('paddingRight', `pr-${props.pr}`);
    }

    if (props.width) names.set('width', props.width);
    if (props.height) names.set('height', props.height);
    if (props.ratio) names.set('ratio', props.ratio);

    if (names.has('direction')) {
      node.name = [...names.values()].join(' ');
    }
  }
}
