import { getLayoutMode } from "./getLayoutMode";

export const isStretch = (node: SceneNode): boolean => {
  switch (getLayoutMode(node, 'parent')) {
    case 'HORIZONTAL': {
      return ('layoutGrow' in node) && (node.layoutGrow === 1) ? true : false;
    }
    case 'VERTICAL': {
      return ('layoutAlign' in node) && (node.layoutAlign === 'STRETCH') ? true : false;
    }
    default: return false;
  }
};
