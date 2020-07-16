export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el instanceof Dom === true
  select($el) {
    this.current = $el;
    this.clear();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  get selectedIds() {
    return this.group.map($el => $el.id());
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group;
    $group.forEach($el => $el.addClass(TableSelection.className));
  }

  applyStyle(styles) {
    this.group.forEach($el => $el.css(styles));
  }
}