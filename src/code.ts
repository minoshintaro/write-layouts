import { setObjectSize } from './setObjectSize';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';
import { setLayerName } from './setLayerName';
// import { test } from './test';

type Command = {
  message: string;
  task: (node: SceneNode) => void;
}
const commands = new Map<string, Command>();

commands.set(
  'Auto Layout by Name',
  { message: 'Auto layout added', task: (node) => setAutoLayout(node) }
);
commands.set(
  'Overwrite with Auto Layout',
  { message: 'Layer name rewrited', task: (node) => setLayerName(node) }
);
commands.set(
  'Resize by Name',
  { message: 'Resized', task: (node) => setObjectSize(node) }
);
commands.set(
  'Fill Horizontally',
  { message: 'Fill', task: (node) => setFlexAxis(node, 'fill') }
);
commands.set(
  'Hug Vertically',
  { message: 'Hug', task: (node) => setFlexAxis(node, 'hug') }
);

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const listOf = (targets: string[], key: string): string[] => {
    switch (key) {
      case '': return targets.slice(0, 2);
      case ' ': return targets;
      default: {
        const pattern = RegExp(`^${key.trim()}`, 'i');
        return targets.filter(item => item.match(pattern));
      }
    }
  }
  result.setSuggestions(listOf([...commands.keys()], query));
});

figma.on('run', ({ parameters }: RunEvent) => {
  const selectNodes = figma.currentPage.selection;
  if (selectNodes.length > 0 && parameters) {
    const command = commands.get(parameters.task);
    if (command) {
      selectNodes.forEach(node => command.task(node));
      figma.closePlugin(command.message);
    }
  } else {
    figma.closePlugin('Please select layers');
  }
});
