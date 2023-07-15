type HasLayoutMode = ComponentNode | ComponentSetNode | FrameNode | InstanceNode;

// const getValuesOfAlignment = (node: HasLayoutMode) => {
//   const props = new Map();
//   if (node.layoutMode === 'VERTICAL') {
//     props.set('x', node.counterAxisAlignItems); // => 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
//     props.set('y', node.primaryAxisAlignItems); // => 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
//   }
//   if (node.layoutMode === 'HORIZONTAL') {
//     props.set('x', node.primaryAxisAlignItems); // => 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
//     props.set('y', node.counterAxisAlignItems); // => 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
//   }
//   return props;
// }
//
// const getValuesOfDistribution = (node: HasLayoutMode) => {
//   const props = new Map();
//   if (node.layoutMode === 'VERTICAL') {
//     props.set('x', node.counterAxisAlignContent); // => 'AUTO' | 'SPACE_BETWEEN'
//     props.set('y', node.primaryAxisAlignItems); // => 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
//   }
//   if (node.layoutMode === 'HORIZONTAL') {
//     props.set('x', node.primaryAxisAlignItems); // => 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
//     props.set('y', node.counterAxisAlignContent); // => 'AUTO' | 'SPACE_BETWEEN'
//   }
//   return props;
// }

export function convertPropsToStringSet(node: HasLayoutMode) {
  const words = new Set();

  // LayoutMode =====

  const mode: string = (node.layoutWrap === 'WRAP') ? node.layoutWrap : node.layoutMode;

  if (mode === 'NONE') return words;
  if (mode === 'VERTICAL') words.add('col');
  if (mode === 'HORIZONTAL') words.add('row');
  if (mode === 'WRAP') words.add('wrap');

  // SpaceBetween =====

  if (node.primaryAxisAlignItems === 'SPACE_BETWEEN') words.add('g-auto');

  // Gap =====

  const primaryGap: number = node.itemSpacing;
  const counterGap: number | null = node.counterAxisSpacing;

  if (words.has('wrap') && primaryGap !== counterGap) {
    if (primaryGap) words.add(`gx-${primaryGap}`);
    if (counterGap) words.add(`gy-${counterGap}`);
  } else if (!words.has('g-auto')) {
    if (primaryGap) words.add(`g-${primaryGap}`);
  }

  // Padding =====

  const pt: number = node.paddingTop;
  const pb: number = node.paddingBottom;
  const pl: number = node.paddingLeft;
  const pr: number = node.paddingRight;
  const py: number | null = (pt === pb) ? pt : null;
  const px: number | null = (pl === pr) ? pl : null;
  const p: number | null = (px === py) ? px : null;

  if (p) words.add(`p-${p}`);
  if (!p && py) words.add(`py-${py}`);
  if (!p && px) words.add(`px-${px}`);
  if (!py && pt) words.add(`pt-${pt}`);
  if (!py && pb) words.add(`pb-${pb}`);
  if (!px && pl) words.add(`pl-${pl}`);
  if (!px && pr) words.add(`pr-${pr}`);

  return words;
}
