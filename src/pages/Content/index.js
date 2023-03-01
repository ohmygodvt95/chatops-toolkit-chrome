import $ from 'jquery';
import { initStickerPluginPostBox, initStickerDialog, initStickerPluginReplyBox } from './modules/print'
import {
  generateImageListByTab,
  textareaUpdateContent,
} from '../../ultis/common'
import {
  DIALOG_SELECTOR,
  MAIN_TEXTAREA_SELECTOR,
  REPLY_TEXTAREA_SELECTOR,
  STICKER_IMG_SELECTOR, STICKER_TAB_RECENT_SELECTOR,
  STICKER_TAB_SELECTOR,
} from '../../ultis/contants'

(async function() {
  chrome.storage.local.get(
    {
      COT_STICKER_LIST: [],
    },
    async function(item) {
      await localStorage.setItem('COT_STICKER_LIST', JSON.stringify(item.COT_STICKER_LIST));
    }
  );
})();

setInterval(async () => {
  if ($('.post-create__container .post-body__actions').length) {
    if ($('.post-create__container .post-body__actions .icon--sticker').length === 0) {
      initStickerPluginPostBox();
    }
  }
}, 1000);

setInterval(async () => {
  if ($('.sidebar--right .post-body__actions').length) {
    if ($('.sidebar--right .post-body__actions .icon--sticker').length === 0) {
      initStickerPluginReplyBox();
    }
  }
}, 1000);

setInterval(async () => {
  if ($('.cot-dialog').length === 0) {
    initStickerDialog();
  }
}, 1000);



$(document).on('click', STICKER_IMG_SELECTOR, function () {
  const dialogElement = $(this).closest('.cot-dialog');
  let textareaSelector = MAIN_TEXTAREA_SELECTOR;
  if (dialogElement.hasClass('cot-sidebar-trigger')) {
    textareaSelector = REPLY_TEXTAREA_SELECTOR;
  }
  const cursorPosition  = $(textareaSelector).prop('selectionStart');
  const src = $(this).attr('src');
  const key = $(this).attr('alt');
  let input = $(textareaSelector).val();
  const updateContent = input.substring(0, cursorPosition) + `![](${src})`  +  input.substring(cursorPosition);
  textareaUpdateContent(textareaSelector, updateContent);
  $(DIALOG_SELECTOR).hide();

  let recent = JSON.parse(localStorage.getItem('COT_STICKER_RECENT')) ?? [];
  recent.filter(i => i.src !== src);
  recent.unshift({
    src: src,
    key: key,
  })
  localStorage.setItem('COT_STICKER_RECENT', JSON.stringify(recent.splice(0, 15)));
})

$(document).on('click', STICKER_TAB_SELECTOR, function () {
  const name = $(this).text();

  $('.cot-dialog-list').html(generateImageListByTab(name));

  $(STICKER_TAB_SELECTOR).removeClass('active');
  $(STICKER_TAB_RECENT_SELECTOR).removeClass('active');
  $(this).addClass('active')
})

$(document).on('click', STICKER_TAB_RECENT_SELECTOR, function () {

  $('.cot-dialog-list').html(generateImageListByTab(null));

  $(STICKER_TAB_SELECTOR).removeClass('active');
  $(this).addClass('active')
})

