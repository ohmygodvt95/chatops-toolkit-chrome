import { initDataSource } from '../../ultis/common'

chrome.runtime.onInstalled.addListener(details => {
  const currentVersion = chrome.runtime.getManifest().version;
  const previousVersion = details.previousVersion;
  const reason = details.reason;

  switch (reason) {
    case 'install':
      chrome.storage.sync.get(
        {
          stickerDataSource: [],
        },
        function(item) {
          if (item.stickerDataSource.length === 0) {
            (async () => {
              try {
                await initDataSource();
              } catch (e) {
                console.log('COT', currentVersion, e);
              }
            })();
          }
        }
      );
      console.log('Installed')
      break;
    case 'update':
      alert('Updated successfully');
      break;
    default:
      alert('Other install events within the browser');
      break;
  }
})
