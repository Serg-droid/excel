import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }
  static className = 'excel__table';

  toHTML() {
    return createTable(40);
  }

  onMousedown(event) {
    if(shouldResize(event)) {
      resizeHandler(event, this);
    }
  }

}
