import { runMainTask } from './runMainTask';
import { setAutoLayout } from './setAutoLayout';
import { setFlexibility } from './setFlexibility';
import { setLayerName } from './setLayerName';
import { setObjectSize } from './setObjectSize';


type Command = {
  message: string ;
  task: (node: SceneNode) => void;
}

const commands = new Map<string, Command>();
commands.set(
  'Layout by Layer Name',
  { message: 'Auto layout added, and resized', task: (node) => runMainTask(node) }
);
commands.set(
  'Overwrite with Auto Layout',
  { message: 'Layer name rewrited', task: (node) => setLayerName(node) }
);
// commands.set(
//   'Auto Layout by Layer Name',
//   { message: 'Auto layout added', task: (node) => setAutoLayout(node) }
// );
// commands.set(
//   'Resize by Layer Name',
//   { message: 'Resized', task: (node) => setObjectSize(node) }
// );
commands.set(
  'Fill Horizontally',
  { message: 'Fill', task: (node) => setFlexibility(node, 'fill') }
);
commands.set(
  'Hug Vertically',
  { message: 'Hug', task: (node) => setFlexibility(node, 'hug') }
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
  if (parameters) {
    const nodeList = figma.currentPage.selection;
    const command = commands.get(parameters.key);
    if (nodeList.length > 0 && command) {
      nodeList.forEach(node => command.task(node));
      figma.closePlugin(command.message);
    }
  }
  figma.closePlugin();
});
