import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.subscribe = options.subscribe || [];
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubs = [];

    this.prepare();
  }

  // Подготовка компонента перед инициализацией
  prepare() {

  }
  // Возвращает шаблон представления
  toHTML() {
    return '';
  }
  // Уведомление слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  // Подписка на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  // Передает компоненту изменения стейта, если изменена та его часть, на которую подписан компонент
  storeChanged(changes) {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }
  // Инициализация слушателей событий
  init() {
    this.initDOMListeners();
  }
  // Удаление всех слушателей событий при удалении компонента
  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}