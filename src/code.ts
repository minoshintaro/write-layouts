import { resizeObject } from './resizeObject';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';
import { setLayerName } from './setLayerName';

type Settings = {
  main: { name: string; message: string; task: (node: SceneNode) => void }[],
  sub: { name: string; message: string; task: (node: SceneNode) => void }[],
  align: { name: string; message: string; }[],
  get: (type: string) => string[]
}

const commandCatalog: Settings = {
  main: [
    { name: 'Auto Layout', message: 'Auto layout added', task: (node) => setAutoLayout(node) },
    { name: 'Overwrite with Auto Layout', message: 'Layer name rewrited', task: (node) => setLayerName(node) }
  ],
  sub: [
    { name: 'Resize Selections', message: 'Resized', task: (node) => resizeObject(node) },
    { name: 'Fill Horizontally', message: 'Fill', task: (node) => setFlexAxis(node, 'fill') },
    { name: 'Hug Vertically', message: 'Hug', task: (node) => setFlexAxis(node, 'hug') }
  ],
  align: [
    { name: 'Top Left', message: 'Align Top Left' },
    { name: 'Top Center', message: 'Align Top Center' },
    { name: 'Top Right', message: 'Align Top Right' },
    { name: 'Left', message: 'Align Left' },
    { name: 'Center', message: 'Align Center' },
    { name: 'Right', message: 'Align Right' },
    { name: 'Bottom Left', message: 'Align Bottom Left' },
    { name: 'Bottom Center', message: 'Align Bottom Center' },
    { name: 'Bottom Right', message: 'Align Bottom Right' },
  ],
  get: (type) => {
    switch (type) {
      case 'main': return commandCatalog.main.map(item => item.name);
      case 'sub': return commandCatalog.sub.map(item => item.name);
      case 'align': return commandCatalog.align.map(item => item.name);
      default: {
        const main = commandCatalog.get('main');
        const sub = commandCatalog.get('sub');
        const align = commandCatalog.get('align');
        return main.concat(sub);
      }
    }
  }
};

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const getAnswerList = (key: string): string[] => {
    if (key === '') {
      return commandCatalog.get('main');
    } else if (key === ' ') {
      return commandCatalog.get('all');
    } else {
      const pattern = RegExp(`^${key.trim()}`, 'i');
      return commandCatalog.get('all').filter(item => item.match(pattern));
    }
  }

  result.setSuggestions(getAnswerList(query));
});

figma.on('run', ({ parameters }: RunEvent) => {
  let message: string = 'Please select layers';

  for (const node of figma.currentPage.selection) {
    if (parameters) {
      switch (parameters.task) {
        case commandCatalog.main[0].name: {
          message = commandCatalog.main[0].message;
          commandCatalog.main[0].task(node);
          break;
        }
        case commandCatalog.main[1].name: {
          message = commandCatalog.main[1].message;
          commandCatalog.main[1].task(node);
          break;
        }
        case commandCatalog.sub[0].name: {
          message = commandCatalog.sub[0].message;
          commandCatalog.sub[0].task(node);
          break;
        }
        case commandCatalog.sub[1].name: {
          message = commandCatalog.sub[1].message;
          commandCatalog.sub[1].task(node);
          break;
        }
        case commandCatalog.sub[2].name: {
          message = commandCatalog.sub[2].message;
          commandCatalog.sub[2].task(node);
          break;
        }
        default: {
          message = 'Resizing & Auto Layout';
          resizeObject(node);
          setAutoLayout(node);
          break;
        }
      }
    }
  }

  figma.closePlugin(message);
});
