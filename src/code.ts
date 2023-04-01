import { logProps } from './logProps';
import { resizeObject } from './resizeObject';
import { setAutoLayoutToFrame } from './setAutoLayoutToFrame';
import { setLayoutToItem } from './setLayoutToItem';

let message: string = 'Select a layer :-(';

const commandList: string[] = [
  'Auto Layout',
  'Fill Items',
  'Resize Selections',
  'Write by Auto Layout',
  // 'Develop'
];

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  const q = query.toLowerCase();

  result.setSuggestions(
    commandList.filter(item => item.toLowerCase().includes(q))
  )
});

figma.on('run', ({ parameters }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    switch (parameters && parameters.task) {
      case commandList[0]:
        message = 'Auto Layout';
        setAutoLayoutToFrame(node);
        break;
      case commandList[1]:
        message = 'Fill Items';
        setLayoutToItem(node);
        break;
      case commandList[2]:
        message = 'Resized Selections';
        resizeObject(node);
        break;
      case commandList[3]:
        message = 'Rewrited Layer Names';
        break;
      case 'Develop':
        message = 'Console log';
        logProps(node);
        break;
      default:
        message = 'Resizing & Auto Layout';
        resizeObject(node);
        setAutoLayoutToFrame(node);
        break;
    }
  }
  figma.closePlugin(message);
});

