export const pattern = {
  frame: /^Frame [0-9]{1,5}/,
  notNone: /^(?!NONE$)/,
  notNumber: /[^0-9]/g,
  notSpacing: /^(?!g-|p-|px-|py-|pt-|pb-|pl-|pr-)/,
}
