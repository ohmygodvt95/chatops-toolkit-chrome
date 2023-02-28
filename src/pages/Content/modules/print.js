import $ from 'jquery';
import { dialogHTML, stickerHTML } from './dialog'
import {
  ACTION_BAR_SELECTOR,
  DIALOG_SELECTOR,
  STICKER_SELECTOR,
} from '../../../ultis/contants'

const getOffset = (el) =>  {
  let _x = 0;
  let _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

let mouseIsInside = false;

export const initStickerPlugin = () => {
  $(ACTION_BAR_SELECTOR).prepend($(stickerHTML));
  if ($('body .cot-dialog').length === 0) {
    $('body').append($(dialogHTML()));
    $(DIALOG_SELECTOR).hide();
  }
  $(STICKER_SELECTOR).click(function (e) {
    const position = getOffset(e.currentTarget);
    $(DIALOG_SELECTOR).css({
      top: position.top - 410,
      left: position.left - 300
    }).show();
  });

  $(DIALOG_SELECTOR).hover(function(){
    mouseIsInside=true;
  }, function(){
    mouseIsInside=false;
  });

  $('body').mouseup(function(){
    if(! mouseIsInside) $(DIALOG_SELECTOR).hide();
  });
};
