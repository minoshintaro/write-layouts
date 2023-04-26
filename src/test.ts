
type Prop = {
    key: string;
    value: number;
}

const list: string[] = ['a', 'b'];
const object: Prop = {
    key: 'lorem',
    value: 1
}

const { key, value } = object;

const map = new Map<string, Prop>();
map.set('key', { key: 'test', value: 1 });

const test = map.get('key');
