import {toInlineStyles} from "@core/utils";
import {defaultStyles} from "@/constants";
import {parse} from "@core/parse";

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = '', DEFAULT_HEIGHT = '';

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const text = state.dataState[id];
    const styles = toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id],
      });
    return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${col}"
            data-type="cell"
            data-id="${id}"
            data-value="${text || ''}"
            style="${styles}; width: ${width}"
        >
            ${parse(text) || ''}
        </div>
  `
  };
}

function toColumn({content, index, width}) {
  return `
          <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}"
            style="width: ${width}"
          >
            ${content}
            <div class="col-resize" data-resize="col"></div>
          </div>
  `
}

function createRow(row, content, state) {
  const resize = row ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(state, row);
  return `
          <div class="row" data-row="${row}" 
               data-type="resizable" style="height: ${height}"
          >
            <div class="row-info">
                ${row  ? row : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
          </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function (content, index) {
    return {
      content, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols, {}));

  for(let row = 0; row < rowsCount; row++){
    const cells = new Array(colCount)
      .fill('')
      .map(toCell(state, row))
      .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}