export class Dom {

  constructor(selector) {
  this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  html(html) {
    if(typeof html === 'string'){
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback = f=>f) {
    this.$el.addEventListener(eventType, callback);
    return this;
  }

  off(eventType, callback = f=>f) {
    this.$el.removeEventListener(eventType, callback);
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  append(node) {
    if(node instanceof Dom){
      node = node.$el;
    }
    if(Element.prototype.append){
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  css(styles = {}){
    Object.assign(this.$el.style, styles);
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  text(text) {
    if(typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if(this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  id(parse) {
    if(parse){
      const parsed = this.id().split(':');
      return {
        col: +parsed[1],
        row: +parsed[0]
      }
    }
    return this.data.id;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if(classes){
    el.classList.add(classes);
  }
  return $(el);
}

