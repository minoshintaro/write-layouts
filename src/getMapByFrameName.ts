import { convertNameTo } from './convertNameTo';
import { patterns } from './patterns';

export function getMapByFrameName (frameName: string) {
  const map = new Map();
  const nameList = frameName.replace(patterns.get('frame'), '').trim().split(/\s/);

  for (const name of nameList) {
    switch (name) {
      case 'row': {
        map.set('direction', 'HORIZONTAL');
        break;
      }
      case 'col': {
        map.set('direction', 'VERTICAL');
        break;
      }
      case 'g-auto': {
        map.set('justification', 'SPACE_BETWEEN');
        break;
      }
      default: {
        if (/^g-/.test(name) && name !== 'g-auto') {
          map.set('gap', convertNameTo.number(name));
          break;
        }
        if (/^p-/.test(name)) {
          map.set('paddingTop', convertNameTo.number(name));
          map.set('paddingBottom', convertNameTo.number(name));
          map.set('paddingLeft', convertNameTo.number(name));
          map.set('paddingRight', convertNameTo.number(name));
          break;
        }
        if (/^py-/.test(name)) {
          map.set('paddingTop', convertNameTo.number(name));
          map.set('paddingBottom', convertNameTo.number(name));
          break;
        }
        if (/^px-/.test(name)) {
          map.set('paddingLeft', convertNameTo.number(name));
          map.set('paddingRight', convertNameTo.number(name));
          break;
        }
        if (/^pt-/.test(name)) {
          map.set('paddingTop', convertNameTo.number(name));
          break;
        }
        if (/^pb-/.test(name)) {
          map.set('paddingBottom', convertNameTo.number(name));
          break;
        }
        if (/^pl-/.test(name)) {
          map.set('paddingLeft', convertNameTo.number(name));
          break;
        }
        if (/^pr-/.test(name)) {
          map.set('paddingRight', convertNameTo.number(name));
          break;
        }
        if (/^w-/.test(name)) {
          map.set('width', convertNameTo.number(name));
          break;
        }
        if (/^h-/.test(name)) {
          map.set('height', convertNameTo.number(name));
          break;
        }
        if (/^[0-9]{1,4}x[0-9]{1,4}$/.test(name)) {
          map.set('ratio', convertNameTo.multiplier(name));
          map.set('inverseRatio', convertNameTo.multiplier(name, 'inverse'));
          break;
        }
        break;
      }
    }
  }
  return map;
}
