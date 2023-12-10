
export function generateNumberFrom(input: string): number | null {
  const words: string[] = input.split('-');
  const value: number = parseInt(words[words.length - 1]);
  return typeof value === 'number' ? value : null;
}

export function generateNameFrom(node: SceneNode): string | null {
  if (node.type !== 'FRAME' || node.layoutMode === 'NONE') return null;

  const classNameSet = new Set<string>();
  const { layoutMode, layoutWrap, itemSpacing, counterAxisSpacing, paddingLeft: pl, paddingRight: pr, paddingTop: pt, paddingBottom: pb } = node;

  const col: boolean = layoutMode === 'VERTICAL';
  const row: boolean = layoutMode === 'HORIZONTAL' && layoutWrap === 'NO_WRAP';
  const wrap: boolean = layoutMode === 'HORIZONTAL' && layoutWrap === 'WRAP';
  const gapY: boolean = counterAxisSpacing !== null && counterAxisSpacing !== 0;
  const gapX: boolean = itemSpacing !== 0 && gapY;
  const gap: boolean = itemSpacing !== 0 && !gapY;
  const py: boolean = pt === pb && pt !== 0;
  const px: boolean = pl === pr && pl !== 0;
  const p: boolean = py && px;

  if (row) classNameSet.add('flex');
  if (col) classNameSet.add('flex flex-col');
  if (wrap) classNameSet.add('flex flex-wrap');
  if (gap) classNameSet.add(`gap-${itemSpacing}`);
  if (gapX) classNameSet.add(`gap-x-${itemSpacing}`);
  if (gapY) classNameSet.add(`gap-y-${counterAxisSpacing}`);
  if (p) classNameSet.add(`p-${pl}`);
  if (!p && px) classNameSet.add(`px-${pl}`);
  if (!p && py) classNameSet.add(`py-${pt}`);
  if (!px && pl) classNameSet.add(`pl-${pl}`);
  if (!px && pr) classNameSet.add(`pr-${pr}`);
  if (!py && pt) classNameSet.add(`pt-${pt}`);
  if (!py && pb) classNameSet.add(`pb-${pb}`);

  return [...classNameSet].join(' ');
}
