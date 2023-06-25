export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const getElements = (el, selector): Array<Element> => Array.prototype.slice.call(el.querySelectorAll(selector)).map(hwTab => hwTab);

export const isTextNode = node => node.nodeType === 3;
