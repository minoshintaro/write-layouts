import { LayoutProp } from "./types";
import { isInputMode, isRenameMode, isResetMode, isClearMode } from "./boolean";
import { editPropsByClassName } from "./edit";
import { findMatchedList } from "./find";
import { generateNameFrom } from "./generate";
import { getSubNodes } from "./get";
import { setLayoutProp } from "./set";

figma.skipInvisibleInstanceChildren = true;

// [1] Query -> Input (ClassName | Menu)

figma.parameters.on('input', ({ query, result }: ParameterInputEvent) => {
  result.setSuggestions(findMatchedList(query));
});

// [2] Input -> ClassName -> Layout props
// - INPUT { 属性上書き: true, 名前上書き: true }
// - RENAME { 属性上書き: false, 名前上書き: true }
// - RESET { 属性上書き: true, 名前上書き: false }
// - CLEAR { 属性上書き: false, 名前上書き: true }

figma.on('run', ({ command, parameters }: RunEvent) => {
  const newLayout: LayoutProp = {};
  const input = parameters ? parameters.input.trim() : null;
  let closingMessage = 'Not Change';

  for (const selectedNode of figma.currentPage.selection) {
    const nodes = isInputMode(command, input) ? [selectedNode] : [selectedNode, ...getSubNodes(selectedNode)];

    for (const node of nodes) {
      if (node.type !== 'FRAME') continue;
      const { name } = node;

      if (isInputMode(command, input)) {
        setLayoutProp(node, editPropsByClassName(newLayout, input));
        node.name = generateNameFrom(node) || name;
        closingMessage = 'Set Layout';
      } else if (isRenameMode(command, input)) {
        node.name = generateNameFrom(node) || name;
        closingMessage = 'Renamed';
      } else if (isResetMode(command, input)) {
        setLayoutProp(node, editPropsByClassName(newLayout, name));
        closingMessage = 'Set Layouts';
      } else if (isClearMode(command, input)) {
        node.name = 'Frame';
        closingMessage = 'Clear Frame Names';
      }
    }
  }
  figma.closePlugin(closingMessage);
});
