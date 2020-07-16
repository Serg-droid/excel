export function capitalize(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  const difference = Math.abs(end - start);
  return new Array(difference + 1)
    .fill('')
    .map((_, index) => Math.min(start, end) + index);
}

export function storage(key, data) {
  if(!data){
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if(typeof a === 'object' && typeof b === 'object'){
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function toDashFromCamel(str) {
  return str.replace(/[A-Z]/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map(key => `${toDashFromCamel(key)}: ${styles[key]}`)
    .join('; ');
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn.apply(this, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}