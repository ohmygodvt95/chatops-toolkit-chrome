import { generateImageListByTab } from '../../../ultis/common'

export const dialogHTML = () => {
  const stickers = JSON.parse(localStorage.getItem('COT_STICKER_LIST')) ?? [];

  let tabs = '';
  for (const sticker of stickers) {
    tabs += `<button data-version="${sticker.version}">${sticker.name}</button>`;
  }

  return `
<div class="cot-dialog">
  <div class="cot-dialog-wrapper">
    <div class="cot-dialog-header" style="display: none">
      <input type="text" placeholder="Search">
    </div>
    <div class="cot-dialog-body">
      <div class="cot-dialog-tabs">
        ${tabs}
      </div>
      <div class="cot-dialog-list">
        ${generateImageListByTab(stickers[0].name)}
      </div>
    </div>
  </div>
</div>
`;
}

export const stickerHTML = `
<button type="button" class="style--none post-action icon icon--attachment icon--sticker" title="Sticker & GIFs">
  <i class="fa fa-sticky-note" style="font-size: 16px"></i>
</button>
`;

