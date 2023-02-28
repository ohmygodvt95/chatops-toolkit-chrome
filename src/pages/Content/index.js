import $ from 'jquery';
import { initStickerPlugin } from './modules/print'
import {
  generateImageListByTab,
  textareaUpdateContent,
} from '../../ultis/common'
import {
  DIALOG_SELECTOR,
  MAIN_TEXTAREA_SELECTOR,
  STICKER_IMG_SELECTOR,
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
  if ($('.post-body__actions').length) {
    if ($('.post-body__actions .icon--sticker').length === 0) {
      initStickerPlugin();
    }
  } else {
    console.info('Waiting for page load...')
  }
}, 1000);



$(document).on('click', STICKER_IMG_SELECTOR, function (e) {
  const cursorPosition  = $(MAIN_TEXTAREA_SELECTOR).prop('selectionStart');
  const src = $(this).attr('src');
  let input = $(MAIN_TEXTAREA_SELECTOR).val();
  const updateContent = input.substring(0, cursorPosition) + `![](${src})`  +  input.substring(cursorPosition);
  textareaUpdateContent(MAIN_TEXTAREA_SELECTOR, updateContent);
  $(DIALOG_SELECTOR).hide();
})

$(document).on('click', STICKER_TAB_SELECTOR, function () {
  const name = $(this).text();

  $('.cot-dialog-list').html(generateImageListByTab(name));

  $(STICKER_TAB_SELECTOR).removeClass('active')
  $(this).addClass('active')
})
