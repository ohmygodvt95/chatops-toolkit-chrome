import $ from 'jquery';
import { dialogHTML, stickerHTML } from './dialog'
import {
  ACTION_BAR_REPLY_SELECTOR,
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

export const initStickerPluginPostBox = () => {
  $(ACTION_BAR_SELECTOR).prepend($(stickerHTML));
};

export const initStickerPluginReplyBox = () => {
  $(ACTION_BAR_REPLY_SELECTOR).prepend($(stickerHTML));
};

export const initStickerDialog = () => {
  if ($('body .cot-dialog').length === 0) {
    $('body').append($(dialogHTML()));
    $(DIALOG_SELECTOR).hide();
  }

  $(document).on('click', STICKER_SELECTOR, function (e) {
    const isSidebar = $(this).closest('.sidebar--right').length
    if (isSidebar) {
      $(DIALOG_SELECTOR).removeClass('cot-main-trigger').addClass('cot-sidebar-trigger');
    } else {
      $(DIALOG_SELECTOR).removeClass('cot-sidebar-trigger').addClass('cot-main-trigger');
    }
    const position = getOffset(e.currentTarget);
    let dialogPosition = {
      top: position.top - 410,
      left: position.left - 300,
    };

    if (isSidebar && position.top < 410) {
      dialogPosition.top =  position.top + 35
    }

    $(DIALOG_SELECTOR).css({
      top: dialogPosition.top,
      left: dialogPosition.left
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
}
