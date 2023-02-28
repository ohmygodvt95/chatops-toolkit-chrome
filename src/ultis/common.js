export const generateImageListByTab = (name) => {
  const stickers = JSON.parse(localStorage.getItem('COT_STICKER_LIST')) ?? [];
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
          version: '2019030401',
          src: 'https://dl.dropboxusercontent.com/s/lmxis68cfh4v1ho/default.json?dl=1',
          type: 'default',
        },
        {
          name: 'Vietnamese',
          version: '2019080701',
          src: 'https://dl.dropboxusercontent.com/s/2b085bilbno4ri1/vietnamese.json?dl=1',
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
