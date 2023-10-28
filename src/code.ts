import { LayoutProp } from "./types";
import { menu } from "./objects";
import { includeSubNodes, isSettingMode, isNamingMode } from "./boolean";
import { addToDataFromClassNames } from "./add";
import { findMatched } from "./find";
import { generateNameFrom } from "./generate";
import { getTargetNodes } from "./get";
import { setLayoutProp } from "./set";

figma.skipInvisibleInstanceChildren = true;

// [1] Query -> Input
figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
  result.setSuggestions(findMatched(query));
});

// [2] Input -> LayoutProp ClassNames -> Props -> Override
figma.on('run', ({ command, parameters }: RunEvent) => {
  const { input } = parameters;

  // [2-1] All Props | Only Input Props
  const newLayout: LayoutProp = {};
  if (command === 'INPUT') addToDataFromClassNames(newLayout, input);

  // [2-2] Selections -> Target
  for (const selectedNode of figma.currentPage.selection) {
    for (const node of getTargetNodes(selectedNode, includeSubNodes(command))) {
      if (node.type !== 'FRAME') continue;
      if (command === 'RESET' || input === menu.reset) addToDataFromClassNames(newLayout, node.name);
      if (isSettingMode(command, input)) setLayoutProp(node, newLayout);
      if (isNamingMode(command, input)) node.name = command !== 'CLEAR' ? generateNameFrom(node) || node.name : 'Frame';
    }
  }

  // console.log('test:', command, input, newLayout);
  figma.closePlugin(command);
});
