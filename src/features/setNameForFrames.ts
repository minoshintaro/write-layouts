import { convertPropsToStringSet } from "./convertPropsToStringSet";
import { getInheritedName } from "./getInheritedName";

export function setNameForFrames(frames: FrameNode[], option?: string): void {
  for (const frame of frames) {
    if (frame.layoutMode === 'NONE') continue;

    const currentName = getInheritedName(frame);
    const words = convertPropsToStringSet(frame);

    if (!currentName || option === 'overwrite') frame.name = [...words.values()].join(' ');
  }
}
