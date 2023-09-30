import { LayoutProp } from "./types";

export function setLayoutProp(node: SceneNode, data: LayoutProp): void {
  if (node.type !== 'FRAME') return;

  if (data.flow !== undefined) node.layoutMode = data.flow;
  if (data.wrap !== undefined) node.layoutWrap = data.wrap;
  if (data.gap !== undefined) node.itemSpacing = data.gap;
  if (data.gapY !== undefined) node.counterAxisSpacing = data.gapY;
  if (data.pl !== undefined) node.paddingLeft = data.pl;
  if (data.pr !== undefined) node.paddingRight = data.pr;
  if (data.pt !== undefined) node.paddingTop = data.pt;
  if (data.pb !== undefined) node.paddingBottom = data.pb;


}
  // frame.primaryAxisSizingMode = layoutPropMap.get('primaryAxisSizingMode') || primaryAxisSizingMode;
  // frame.counterAxisSizingMode = layoutPropMap.get('counterAxisSizingMode') || counterAxisSizingMode;
  // frame.primaryAxisAlignItems = layoutPropMap.get('primaryAxisAlignItems') || primaryAxisAlignItems;
  // frame.counterAxisAlignItems = layoutPropMap.get('counterAxisAlignItems') || counterAxisAlignItems;
  // frame.counterAxisAlignContent = layoutPropMap.get('counterAxisAlignContent') || counterAxisAlignContent;
