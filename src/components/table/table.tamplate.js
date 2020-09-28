const CODES = {
  A: 65,
  Z: 90
}

function toColumn(content) {
  return `<div class="column">${content}</div>`
}

function toCell(content) {
  return `<div class="cell" contenteditable>${content}</div>`
}

function createRow(info, content) {
  return `
    <div class="row">
        <div class="row-info">${info}</div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow('', cols))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i+1, cells))
  }

  return rows.join('')
}