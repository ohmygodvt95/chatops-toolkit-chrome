export const generateImageListByTab = (name = null) => {
  let key = 'COT_STICKER_LIST';
  if (name === null) {
    key = 'COT_STICKER_RECENT';
    const stickers = JSON.parse(localStorage.getItem(key)) ?? [];
    let stickerList = '';
    for (const image of stickers) {
      stickerList += `<img src="${image.src}" alt="${image.key}" />`;
    }

    return stickerList;
  }
  const stickers = JSON.parse(localStorage.getItem(key)) ?? [];
  const selectedSticker = stickers.find((item) => item.name === name);

  let stickerList = '';
  for (const image of selectedSticker?.data) {
    stickerList += `<img src="${image.src}" alt="${image.key}" />`;
  }

  return stickerList;
}

export const initDataSource = async () => {
  chrome.storage.sync.get(
    {
      stickerDataSource: [
        {
          name: 'Default',
          version: '2023030111',
          src: 'https://dl.dropboxusercontent.com/s/1mjo82an1fi6dlg/default.json?dl=1',
          type: 'default',
        },
        {
          name: 'Vietnamese',
          version: '2023030112',
          src: 'https://dl.dropboxusercontent.com/s/djvsqx24io4glz5/vietnamese.json?dl=1',
          type: 'default',
        },
        {
          name: 'Ami Fatcat',
          version: '2023030114',
          src: 'https://dl.dropboxusercontent.com/s/us4xu7d23ddwpmx/amifatcat.json?dl=1',
          type: 'default',
        },
      ],
    },
    function(item) {
      chrome.storage.sync.set(item, async function() {
        for (const i of item.stickerDataSource) {
          const response = await fetch(i.src);
          const data = await response.json();
          i.data = data.emoticons;
        }

        await chrome.storage.local.set({
          COT_STICKER_LIST: item.stickerDataSource,
        });
      });
    }
  );
}

export const textareaUpdateContent = (selector, content) => {
  const textarea = document.querySelector(selector);
  const ev = new Event('input', { bubbles: true});
  textarea.value = content;
  textarea.dispatchEvent(ev);
}
