import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = event.target.dataset.resize
  let value

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    }
    if (type === 'row') {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $resizer.css({right: 0})
    }
    if (type === 'row') {
      $parent.css({height: value + 'px'})
      $resizer.css({bottom: 0})
    }
    $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px')
    document.onmouseup = null
  }
}
