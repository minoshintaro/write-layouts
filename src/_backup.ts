import { getFramesIncludeChildren } from "./features/getFramesIncludeChildren";
import { getValueMapFromString } from "./features/getValueMapFromString";
import { setLayoutByValueMap } from "./features/setLayoutByValueMap";
import { setNameForFrames } from "./features/setNameForFrames";
import { setSizeByValueMap } from "./features/setSizeByValueMap";

const actionList = [
  'Name by AutoLayout',
  'AutoLayout by name',
  'Overwrite name by AutoLayout',
  'col',
  'col g-24',
  'col g-24 p-16',
  'col g-24 py-8 px-16',
  'col g-24 pt-8 pb-16 pl-8 pr-16',
  'row',
  'row g-24',
  'row g-24 p-16',
  'row g-24 py-8 px-16',
  'row g-24 pt-8 pb-16 pl-8 pr-16',
  'wrap',
  'wrap g-24',
  'wrap g-24 p-16',
  'wrap g-24 py-8 px-16',
  'wrap g-24 pt-8 pb-16 pl-8 pr-16',
  'g-auto',
  '1x1',
  '2x1',
  '4x3',
  '5x4',
  '8x5',
  '16x9',
  '21x9',
  'Scale',
  'Check'
];

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  // console.log('query:', query);

  switch (query) {
    case '': {
      result.setSuggestions(actionList.slice(0, 2));
      break;
    }
    default: {
      const pattern = RegExp(`^${query.trim()}`, 'i');
      result.setSuggestions(actionList.filter(action => action.match(pattern)));
      break;
    }
  }
});

figma.on('run', ({ parameters }: RunEvent) => {
  if (!parameters) return figma.closePlugin('No selections');

  console.log('input:', parameters.writtenWord);
  let message = 'Set AutoLayout';

  for (const node of figma.currentPage.selection) {
    switch (parameters.writtenWord) {
      case actionList[0]: {
        if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
          setNameForFrames(getFramesIncludeChildren(node));
        }
        message = 'Renamed frames, excluding the edited name';
        break;
      }

      case actionList[1]: {
        if (node.type === 'FRAME') {
          setLayoutByValueMap(node, getValueMapFromString(node.name));
          setNameForFrames([node]);
        }
        message = 'Set AutoLayout'
        break;
      }

      case actionList[2]: {
        if (node.type === 'FRAME') {
          setNameForFrames([node], 'overwrite');
        }
        message = 'Overwrote the name';
        break;
      }

      case 'Scale': {
        message = 'Set scale';
        break;
      }

      case actionList[actionList.length - 1]: {
        message = `${node.type}, ${node.parent ? node.parent.type : 'NONE'}`;
        break;
      }

      default: {
        const values = getValueMapFromString(parameters.writtenWord);

        if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE' || node.type === 'RECTANGLE') {
          setSizeByValueMap(node, values);
        }
        if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
          setLayoutByValueMap(node, values);
        }
        if (node.type === 'FRAME') {
          setNameForFrames([node]);
        }

        break;
      }
    }
  }

  figma.closePlugin(message);
});
