const getNumberInString = (text: string): number => {
  return Number(text.replace(/[^0-9]/g, ''));
}

const getRatioInString = (text: string): number => {
  const ratio = text.split('x').map(Number);
  return Math.round(ratio[1] / ratio[0] * 100) / 100;
};

const patterns = new Map();
patterns.set('gx', /^gx-[0-9]{0,4}$/);
patterns.set('gy', /^gy-[0-9]{0,4}$/);
patterns.set('g', /^g-[0-9]{0,4}$/);
patterns.set('pl', /^pl-[0-9]{0,4}$/);
patterns.set('pr', /^pr-[0-9]{0,4}$/);
patterns.set('pt', /^pt-[0-9]{0,4}$/);
patterns.set('pb', /^pb-[0-9]{0,4}$/);
patterns.set('px', /^px-[0-9]{0,4}$/);
patterns.set('py', /^py-[0-9]{0,4}$/);
patterns.set('p', /^p-[0-9]{0,4}$/);
patterns.set('w', /^w-[0-9]{0,4}$/);
patterns.set('h', /^h-[0-9]{0,4}$/);
patterns.set('aspect', /^[0-9]{0,4}x[0-9]{0,4}$/);

export function getValueMapFromString(text: string) {

  // string => value
  // layoutMode: 'VERTICAL' | 'HORIZONTAL'
  // layoutWrap: 'NO_WRAP' | 'WRAP'
  // primaryAxis: 'SPACE_BETWEEN'
  // itemSpacing: number
  // counterAxisSpacing: number | null
  // paddingTop: number
  // paddingBottom: number
  // paddingLeft: number
  // paddingRight: number

  const props = new Map();

  for (const item of text.split(/\s/)) {
    if (item === 'col') {
      props.set('layoutMode', 'VERTICAL');
      continue;
    }
    if (item === 'row') {
      props.set('layoutMode', 'HORIZONTAL');
      props.set('layoutWrap', 'NO_WRAP');
      continue;
    }
    if (item === 'wrap') {
      props.set('layoutMode', 'HORIZONTAL');
      props.set('layoutWrap', 'WRAP');
      continue;
    }

    if (item === 'g-auto') {
      props.set('primaryAxis', 'SPACE_BETWEEN');
      continue;
    }
    if (item.match(patterns.get('g')) || item.match(patterns.get('gx'))) {
      props.set('itemSpacing', getNumberInString(item));
      continue;
    }
    if (item.match(patterns.get('gy'))) {
      props.set('counterAxisSpacing', getNumberInString(item));
      continue;
    }

    if (item.match(patterns.get('p'))) {
      ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].forEach(key => props.set(key, getNumberInString(item)));
      continue;
    }
    if (item.match(patterns.get('py'))) {
      ['paddingTop', 'paddingBottom'].forEach(key => props.set(key, getNumberInString(item)));
      continue;
    }
    if (item.match(patterns.get('px'))) {
      ['paddingLeft', 'paddingRight'].forEach(key => props.set(key, getNumberInString(item)));
      continue;
    }
    if (item.match(patterns.get('pt'))) {
      props.set('paddingTop', getNumberInString(item));
      continue;
    }
    if (item.match(patterns.get('pb'))) {
      props.set('paddingBottom', getNumberInString(item));
      continue;
    }
    if (item.match(patterns.get('pl'))) {
      props.set('paddingLeft', getNumberInString(item));
      continue;
    }
    if (item.match(patterns.get('pr'))) {
      props.set('paddingRight', getNumberInString(item));
      continue;
    }

    if (item.match(patterns.get('aspect'))) {
      props.set('aspect', getRatioInString(item));
      continue;
    }
  }

  return props;
}
