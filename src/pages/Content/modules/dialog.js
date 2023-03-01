import { generateImageListByTab } from '../../../ultis/common'

export const dialogHTML = () => {
  const stickers = JSON.parse(localStorage.getItem('COT_STICKER_LIST')) ?? [];
  let tabs =  '<button data-recent="recent" title="Recent stickers">' +
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<svg width="16px" height="16px" viewBox="0 0 24 24" id="_24x24_On_Light_Recent" data-name="24x24/On Light/Recent" xmlns="http://www.w3.org/2000/svg">' +
    '  <rect id="view-box" width="24" height="24" fill="none"/>' +
    '  <path id="Shape" d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)" fill="#141124"/>' +
    '</svg></button>';


  for (const sticker of stickers) {
    tabs += `<button data-version="${sticker.version}" title="${sticker.name}">${sticker.name}</button>`;
  }

  return `
<div class="cot-dialog">
  <div class="cot-dialog-wrapper">
    <div class="cot-dialog-header">
      <input type="text" placeholder="Search" style="display: none;">
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

