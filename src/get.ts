
export function getSubNodes(node: SceneNode): SceneNode[] {
  return 'findAllWithCriteria' in node ? node.findAllWithCriteria({ types: ['FRAME'] }) : [];
}

export function getNameForFrame(node: SceneNode): string | null {
  if (node.type !== 'FRAME' || node.type === 'FRAME' && node.layoutMode === 'NONE') return null;

  const renameSet = new Set<string>();
  const { layoutMode, layoutWrap, itemSpacing, counterAxisSpacing, paddingTop, paddingBottom, paddingLeft, paddingRight } = node;
  const paddingBlock = paddingTop && paddingTop === paddingBottom ? paddingTop : 0;
  const paddingInline = paddingLeft && paddingLeft === paddingRight ? paddingLeft : 0;
  const padding = paddingBlock && paddingBlock === paddingInline ? paddingBlock : 0;

  if (layoutMode === 'HORIZONTAL' && layoutWrap === 'NO_WRAP') renameSet.add('flex');
  if (layoutMode === 'HORIZONTAL' && layoutWrap === 'WRAP') renameSet.add('flex flex-wrap');
  if (layoutMode === 'VERTICAL') renameSet.add('flex flex-col');

  if (itemSpacing && !counterAxisSpacing) renameSet.add(`gap-${itemSpacing}`);
  if (itemSpacing && counterAxisSpacing) renameSet.add(`gap-x-${itemSpacing} gap-y-${counterAxisSpacing}`);

  if (padding) renameSet.add(`p-${padding}`);
  if (!padding && paddingInline) renameSet.add(`px-${paddingInline}`);
  if (!padding && paddingBlock) renameSet.add(`py-${paddingBlock}`);
  if (!paddingBlock && paddingTop) renameSet.add(`pt-${paddingTop}`);
  if (!paddingInline && paddingRight) renameSet.add(`pr-${paddingRight}`);
  if (!paddingBlock && paddingBottom) renameSet.add(`pb-${paddingBottom}`);
  if (!paddingInline && paddingLeft) renameSet.add(`pl-${paddingLeft}`);

  return [...renameSet].join(' ');
}
