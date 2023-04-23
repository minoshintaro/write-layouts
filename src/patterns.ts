export const patterns = new Map();
patterns.set('aspect', /^[0-9]{0,4}x[0-9]{0,4}$/);
patterns.set('frame', /^Frame [0-9]{1,5}/);
patterns.set('sizeName', /^[0-9]{0,4}x[0-9]{0,4}$|^(w|h)-[0-9]{0,4}$/);
patterns.set('width', /^w-[0-9]{0,4}$/);
patterns.set('height', /^h-[0-9]{0,4}$/);
patterns.set('notPropName', /^(?!(row|col|g-auto)$|(g|p|px|py|pt|pb|pl|pr|w|h)-[0-9]{0,4}$|[0-9]{0,4}x[0-9]{0,4}$)/);
patterns.set('notNumber', /[^0-9]/g);
