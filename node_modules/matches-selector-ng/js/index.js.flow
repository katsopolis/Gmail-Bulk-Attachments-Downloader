/* @flow */

const proto = global.Element && global.Element.prototype;
const vendor = proto && (proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector);

export default function match(el: HTMLElement, selector: string): boolean {
  if (vendor) return vendor.call(el, selector);
  const {parentNode} = el;
  if (parentNode && typeof (parentNode:any).querySelectorAll === 'function') {
    const nodes = (parentNode:any).querySelectorAll(selector);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === el) return true;
    }
  }
  return false;
}
