
const patterns = new Map();
patterns.set('frame', /^Frame [0-9]{1,9}/);
patterns.set('layout', /^(?=\w)(?!((row|col|wrap|g-auto)$|(g|gy|gx|p|py|px|pt|pb|pl|pr)-[0-9]{0,4}$))/);
// ^ 行頭
// (?!...) 否定先読みアサーション ※括弧内が継続しない場合、マッチする
// $ 行末
// (...) グルーピング
// ...|... または

export function getInheritedName(node: FrameNode): string[] | null {
  const target = node.name.replace(patterns.get('frame'), '').trim();
  const results = target.split(/\s/).filter(item => item.match(patterns.get('layout')));
  return (results.length === 0) ? null : results;
}
