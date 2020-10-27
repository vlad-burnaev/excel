import {range} from '@core/utils';
import {colsCount, rowsCount} from '@/components/table/table.template';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.hasAttribute('data-id')
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  const MAX_COL_VALUE = colsCount - 1;
  const MAX_ROW_VALUE = rowsCount - 1;
  switch (key) {
    case 'Enter':
      row = row + 1 > MAX_ROW_VALUE ? MAX_ROW_VALUE : row + 1
      break
    case 'Tab':
      col = col + 1 > MAX_COL_VALUE ? MAX_COL_VALUE : col + 1
      break
  }
  return `[data-id="${row}:${col}"`
}
