const CODES = {
  A: 65,
  Z: 90
}

export const colsCount = CODES.Z - CODES.A + 1
export const rowsCount = 15

function toColumn(content, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell(row) {
  return function(_, col) {
    return `<div class="cell" 
              contenteditable 
              data-col="${col}"
              data-id="${row}:${col}"
            ></div>`
  }
}

function createRow(info, content) {
  // eslint-disable-next-line max-len
  const resizer = info ? `<div class="row-resize" data-resize="row"></div>` : '';
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
          ${info}
          ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable() {
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow('', cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
