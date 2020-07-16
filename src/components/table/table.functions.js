import {range} from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(target.col, current.col);
  const rows = range(target.row, current.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => {
      acc.push(`${row}:${col}`);
    })
    return acc;
  }, []);
}

export function nextSelector(key, {col, row}){
  const MIN_VALUE = 0;
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowLeft':
      col = Math.max(col - 1, MIN_VALUE);
      break;
    case 'ArrowUp':
      row = Math.max(row - 1, MIN_VALUE);
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
