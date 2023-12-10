export type LayoutProp = {
  flow?: AutoLayoutMixin['layoutMode'];
  wrap?: AutoLayoutMixin['layoutWrap'];

  // primaryAxisSizingMode: 'FIXED' | 'AUTO'
  // counterAxisSizingMode: 'FIXED' | 'AUTO'
  // primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
  // counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
  // counterAxisAlignContent: 'AUTO' | 'SPACE_BETWEEN'

  gap?: AutoLayoutMixin['itemSpacing'];
  gapX?: AutoLayoutMixin['itemSpacing'];
  gapY?: AutoLayoutMixin['counterAxisSpacing'];

  pl?: AutoLayoutMixin['paddingLeft'];
  pr?: AutoLayoutMixin['paddingRight'];
  pt?: AutoLayoutMixin['paddingTop'];
  pb?: AutoLayoutMixin['paddingBottom'];

  // itemReverseZIndex: boolean
  // strokesIncludedInLayout: boolean
}
