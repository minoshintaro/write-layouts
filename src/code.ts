import { logProps } from './logProps';
import { getFilteredList } from './getFilteredList'
import { resizeObject } from './resizeObject';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';
import { setLayerName } from './setLayerName';

type Settings = {
  main: { name: string; message: string}[],
  sub: { name: string; message: string}[],
  align: { name: string; message: string}[]
}

const commandCatalog: Settings = {
  main: [
    { name: 'Auto Layout', message: 'Auto layout added'},
    { name: 'Write Over', message: 'Layer name rewrited'}
  ],
  sub: [
    { name: 'Resize', message: 'Resized'},
    { name: 'Fill Horizontally', message: 'Fill' },
    { name: 'Fixed Horizontally', message: 'Fixed' },
    { name: 'Hug Vertically', message: 'Hug' }
  ],
  align: [
    { name: 'Align Center', message: 'Center' },
    { name: 'Align Left', message: 'Left' },
    { name: 'Align Right', message: 'Right' },
    { name: 'Align Middle', message: 'Middle' },
    { name: 'Align Top', message: 'Top' },
    { name: 'Align Bottom', message: 'Bottom' },
  ]
};

const getCommandList = (key: string): string[] => {
  switch (key) {
    case 'main': return commandCatalog.main.map(item => item.name);
    case 'sub': return commandCatalog.sub.map(item => item.name);
    case 'align': return commandCatalog.align.map(item => item.name);
    default: return [''];
  }
}

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const getAnswerList = (key: string): string[] => {
    if (key === '') {
      return getFilteredList(getCommandList('main'), key);
    } else {
      const checkHasKey = (target: string, key: string): boolean => {
        return RegExp(`${key}`, 'gi').test(target);
      };
      switch (true) {
        case checkHasKey(getCommandList('sub').toString(), key): return getFilteredList(getCommandList('sub'), key);
        default: return getFilteredList(getCommandList('main'), key);
      }
    }
  }
  result.setSuggestions(getAnswerList(query));
});

figma.on('run', ({ parameters }: RunEvent) => {
  let message: string = 'Please select layers';

  for (const node of figma.currentPage.selection) {
    if (parameters) {
      switch (parameters.task) {
        case commandCatalog.main[0].name:
          message = commandCatalog.main[0].message;
          setAutoLayout(node);
          break;
        case commandCatalog.main[1].name:
          message = commandCatalog.main[1].message;
          setLayerName(node);
          break;
        case commandCatalog.sub[0].name:
          message = commandCatalog.sub[0].message;
          resizeObject(node);
          break;
        case commandCatalog.sub[1].name:
          message = commandCatalog.sub[1].message;
          setFlexAxis(node, 'fill');
          break;
        case commandCatalog.sub[2].name:
          message = commandCatalog.sub[2].message;
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
