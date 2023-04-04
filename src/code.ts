import { logProps } from './logProps';
import { resizeObject } from './resizeObject';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';

let message: string = 'Please select layers';

const commandCatalog = {
  main: [
    { name: 'Auto Layout', message: 'Auto layout added'},
    { name: 'Resize Selections', message: 'Resized'},
  ],
  sub: [
    { name: 'Fill Horizontally', message: 'Fill' },
    { name: 'Fixed Horizontally', message: 'Fixed' },
    { name: 'Hug Vertically', message: 'Hug' },
    { name: 'Write by Auto Layout', message: 'Rewrited'}
  ]
};

function getPassList(list: string[], key: string): string[] {
  const k = key.toLowerCase();
  return list.filter(item => item.toLowerCase().includes(k));
}

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const mainList = commandCatalog.main.map(item => item.name);
  const subList = commandCatalog.sub.map(item => item.name);
  const answerList = (q: string) => {
    switch (true) {
      case q === '': return getPassList(mainList, q);
      case RegExp(q, 'i').test(subList.toString()): return getPassList(subList, q);
      default: return getPassList(mainList, q);
    }
  }

  result.setSuggestions(answerList(query));
});

figma.on('run', ({ parameters }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    if (parameters) {
      switch (parameters.task) {
        case commandCatalog.main[0].name:
          message = commandCatalog.main[0].message;
          setAutoLayout(node);
          break;
        case commandCatalog.main[1].name:
          message = commandCatalog.main[1].message;
          resizeObject(node);
          break;
        case commandCatalog.sub[0].name:
          message = commandCatalog.sub[0].message;
          setFlexAxis(node, 'fill');
          break;
        case commandCatalog.sub[1].name:
          message = commandCatalog.sub[1].message;
          setFlexAxis(node, 'hug');
          break;
        case 'dev':
          message = 'Console log';
          logProps(node);
          break;
        default:
          message = 'Resizing & Auto Layout';
          resizeObject(node);
          setAutoLayout(node);
          break;
      }
    }
  }
  figma.closePlugin(message);
});
