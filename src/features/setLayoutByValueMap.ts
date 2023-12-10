type HasLayoutMode = FrameNode | ComponentNode | ComponentSetNode;

  // console.log('Input', [...props.entries()].join(' '));
  // layoutMode: 'VERTICAL' | 'HORIZONTAL'
  // layoutWrap: 'NO_WRAP' | 'WRAP' * only HORIZONTAL
  // primaryAxis: 'SPACE_BETWEEN'
  // itemSpacing: number
  // counterAxisSpacing: number | null
  // paddingTop: number
  // paddingBottom: number
  // paddingLeft: number
  // paddingRight: number

  // [1] Reset all props
  // 'row g-12 p-24'
  // [2] Override spacing prop
  // 'p-24 pt-8 pl-8'
  // [3] Prompt
  // '1x1'

export function setLayoutByValueMap(node: HasLayoutMode, props: Map<string, any>): void {
  if (props.has('layoutMode')) {
    node.layoutMode = props.get('layoutMode');

    if (!props.has('primaryAxis')) {
      const current = node.primaryAxisAlignItems;
      props.set('primaryAxis', current === 'SPACE_BETWEEN' ? 'MIN' : current);
    }
    if (!props.has('itemSpacing')) props.set('itemSpacing', 0);
    if (!props.has('counterAxisSpacing')) props.set('counterAxisSpacing', null);
    if (!props.has('paddingTop')) props.set('paddingTop', 0);
    if (!props.has('paddingBottom')) props.set('paddingBottom', 0);
    if (!props.has('paddingLeft')) props.set('paddingLeft', 0);
    if (!props.has('paddingRight')) props.set('paddingRight', 0);
  }

  if (props.has('layoutWrap')) node.layoutWrap = props.get('layoutWrap');
  if (props.has('primaryAxis')) node.primaryAxisAlignItems = props.get('primaryAxis');
  if (props.has('itemSpacing')) node.itemSpacing = props.get('itemSpacing');
  if (props.get('counterAxisSpacing')) node.counterAxisSpacing = props.get('counterAxisSpacing');
  if (props.has('paddingTop')) node.paddingTop = props.get('paddingTop');
  if (props.has('paddingBottom')) node.paddingBottom = props.get('paddingBottom');
  if (props.has('paddingLeft')) node.paddingLeft = props.get('paddingLeft');
  if (props.has('paddingRight')) node.paddingRight = props.get('paddingRight');
}
