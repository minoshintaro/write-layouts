type HasResize = FrameNode | ComponentNode | InstanceNode | RectangleNode;

const calculateHeight = (width: number, ratio: number): number => {
  const result = Math.round(width * ratio);
  return (result >= 1) ? result : 1;
};

export function setSizeByValueMap(node: HasResize, props: Map<string, any>): void {
  const w = node.width;
  const h = props.has('aspect') ? calculateHeight(w, props.get('aspect')) : null;
  if (h) node.resize(w, h);
}
