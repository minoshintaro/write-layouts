import { logProps } from './logProps';
import { resizeObject } from './resizeObject';
import { setAutoLayout } from './setAutoLayout';
import { setFlexAxis } from './setFlexAxis';

let message: string = 'Select a layer :-(';

const commandList: string[] = [
  'Auto Layout',
  'Resize Selections',
  'Write by Auto Layout',
];

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const q = query.toLowerCase();

  switch (q) {
    case 'f':
      result.setSuggestions(
        ['Fill Items'].filter(item => item.toLowerCase().includes(q))
      );
      break;
    default:
      result.setSuggestions(
        commandList.filter(item => item.toLowerCase().includes(q))
      );
      break;
  }
});

figma.on('run', ({ parameters }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    switch (parameters && parameters.task) {
      case commandList[0]:
        message = 'Auto Layout';
        setAutoLayout(node);
        break;
      case commandList[1]:
        message = 'Resized Selections';
        resizeObject(node);
        break;
      case commandList[2]:
        message = 'Rewrited Layer Names';
        break;
      case 'Fill Items':
        message = 'Fill Items';
        setFlexAxis(node);
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
  figma.closePlugin(message);
});
