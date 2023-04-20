import { setObjectSize } from './setObjectSize';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';
import { setLayerName } from './setLayerName';
// import { test } from './test';

type Command = {
  message: string;
  task: (node: SceneNode) => void;
}
const commandMap = new Map<string, Command>();
commandMap.set(
  'Auto Layout by Name',
  { message: 'Auto layout added', task: (node) => setAutoLayout(node) }
);
commandMap.set(
  'Overwrite with Auto Layout',
  { message: 'Layer name rewrited', task: (node) => setLayerName(node) }
);
commandMap.set(
  'Resize by Name',
  { message: 'Resized', task: (node) => setObjectSize(node) }
);
commandMap.set(
  'Fill Horizontally',
  { message: 'Fill', task: (node) => setFlexAxis(node, 'fill') }
);
commandMap.set(
  'Hug Vertically',
  { message: 'Hug', task: (node) => setFlexAxis(node, 'hug') }
);

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const commandsOf = (key: string): string[] => {
    const commandList: string[] = [...commandMap.keys()];
    switch (key) {
      case '': return commandList.slice(0, 2);
      case ' ': return commandList;
      default: {
        const pattern = RegExp(`^${key.trim()}`, 'i');
        return commandList.filter(item => item.match(pattern));
      }
    }
  }
  result.setSuggestions(commandsOf(query));
});

figma.on('run', ({ parameters }: RunEvent) => {
  if (parameters && commandMap.has(parameters.key)) {
    const command = commandMap.get(parameters.key);
    if (command) {
      figma.currentPage.selection.forEach(node => command.task(node));
      figma.closePlugin(command.message);
    }
  }
  figma.closePlugin('Please select layers');
});
