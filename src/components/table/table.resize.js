import {$} from "@core/dom";

export function resizeHandler(event, _this) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();

  let value;

  const sideProp = type === 'col' ? 'bottom' : 'right';
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - (pageYOffset + coords.bottom);
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'})
    }
  };

  document.onmouseup = e => {
    document.onmousemove = null;
    document.onmouseup = null;

    if(type === 'col'){
      $parent.css({width: value + 'px'});
      _this.$root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }

    $resizer.css({
      opacity: null,
      right: null,
      bottom: null,
    });
  };
}