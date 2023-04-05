import { logProps } from './logProps';
import { resizeObject } from './resizeObject';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';

type Settings = {
  main: { name: string; message: string}[],
  sub: { name: string; message: string}[]
}

const commandCatalog: Settings = {
  main: [
    { name: 'Auto Layout', message: 'Auto layout added'},
    { name: 'Resize', message: 'Resized'},
  ],
  sub: [
    { name: 'Fill Horizontally', message: 'Fill' },
    { name: 'Fixed Horizontally', message: 'Fixed' },
    { name: 'Hug Vertically', message: 'Hug' },
    { name: 'Align Center', message: 'Center' },
    { name: 'Align Left', message: 'Left' },
    { name: 'Align Right', message: 'Right' },
    { name: 'Align Middle', message: 'Middle' },
    { name: 'Align Top', message: 'Top' },
    { name: 'Align Bottom', message: 'Bottom' },
    { name: 'Write by Auto Layout', message: 'Rewrited'}
  ]
};

function getMatchedList(target: string[], key: string): string[] {
  const k = key.toLowerCase();
  return target.filter(item => item.toLowerCase().includes(k));
}

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  function getCommandList(key: string): string[] {
    const mainList = commandCatalog.main.map(item => item.name);

    function checkSubList(key: string): boolean {
      // RegExp.test(String) // => true | false
      const list = commandCatalog.sub.map(item => item.name);
      const pattern = new RegExp(`${key}`, 'gi')
      return pattern.test(list.toString());
    }

    switch (true) {
      case key === '':
        return getMatchedList(mainList, key);
      case checkSubList(key):
        const subList = commandCatalog.sub.map(item => item.name);
        console.log(subList.toString());
        return getMatchedList(subList, key);
      default:
        return getMatchedList(mainList, key);
    }
  }

  result.setSuggestions(getCommandList(query));
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
