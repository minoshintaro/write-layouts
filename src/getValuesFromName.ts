import { convertTo } from './convertTo';
import { getSplitNameList } from './getSplitNameList';
import { patterns } from './patterns';

export function getValuesFromName (node: SceneNode) {
  const map = new Map();

  for (const name of getSplitNameList(node)) {
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
          map.set('gap', convertTo.number(name));
          break;
        }
        if (/^p-/.test(name)) {
          map.set('paddingTop', convertTo.number(name));
          map.set('paddingBottom', convertTo.number(name));
          map.set('paddingLeft', convertTo.number(name));
          map.set('paddingRight', convertTo.number(name));
          break;
        }
        if (/^py-/.test(name)) {
          map.set('paddingTop', convertTo.number(name));
          map.set('paddingBottom', convertTo.number(name));
          break;
        }
        if (/^px-/.test(name)) {
          map.set('paddingLeft', convertTo.number(name));
          map.set('paddingRight', convertTo.number(name));
          break;
        }
        if (/^pt-/.test(name)) {
          map.set('paddingTop', convertTo.number(name));
          break;
        }
        if (/^pb-/.test(name)) {
          map.set('paddingBottom', convertTo.number(name));
          break;
        }
        if (/^pl-/.test(name)) {
          map.set('paddingLeft', convertTo.number(name));
          break;
        }
        if (/^pr-/.test(name)) {
          map.set('paddingRight', convertTo.number(name));
          break;
        }
        if (/^w-/.test(name)) {
          map.set('width', convertTo.number(name));
          break;
        }
        if (/^h-/.test(name)) {
          map.set('height', convertTo.number(name));
          break;
        }
        if (patterns.get('ratio').test(name)) {
          map.set('ratio', convertTo.multiplier(name));
          map.set('inverseRatio', convertTo.multiplier(name, 'inverse'));
          break;
        }
        break;
      }
    }
  }

  return map;
}
