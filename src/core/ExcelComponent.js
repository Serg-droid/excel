import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }
  // Возвращает шаблон представления
  toHTML() {
    return '';
  }
  // Инициализация слушателей событий
  init() {
    this.initDOMListeners();
  }
  // Удаление всех слушателей событий при удалении компонента
  destroy() {
    this.removeDOMListeners();
  }
}