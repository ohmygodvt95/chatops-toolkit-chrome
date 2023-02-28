import React, {useEffect, useMemo, useState} from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {

  const [stickers, setStickers] = useState([]);
  const [selectedStickerIndex, setSelectedStickerIndex] = useState(0)

  const getData = () => {
    chrome.storage.local.get('COT_STICKER_LIST', (item) => {
      setStickers(item.COT_STICKER_LIST);
    });
  }

  const [message, setMessage] = useState('');

  useEffect(() => {
    getData()
  }, [selectedStickerIndex])

  const [newCollectionUrl, setNewCollectionUrl] = useState('');
  const onAddCollection = () => {
    chrome.storage.sync.get(
        {
          stickerDataSource: []
        },
        async function(item) {
          const response = await fetch(newCollectionUrl);
          const data = await response.json();

          if (item.stickerDataSource.find(i => i.name === data.data_name || newCollectionUrl === i.src)) {
            setMessage('Collection name has been exists. Please rename data_name and try again.');
            setNewCollectionUrl('');
            return;
          }

          let newData = {
            name: data.data_name + '1',
            version: data.data_version,
            src: newCollectionUrl,
            type: 'customize',
          };
          item.stickerDataSource.push(newData);
          chrome.storage.sync.set(item, async function() {
            const sticker = {
              ...newData,
              data: data.emoticons
            };
            const stickerList = JSON.parse(JSON.stringify(stickers));
            stickerList.push(sticker);
            chrome.storage.local.set({
              COT_STICKER_LIST: stickerList,
            }, () => {
              setStickers(stickerList);

              setNewCollectionUrl('');
            });
          });
        }
    );
  }

  const onDelete = () => {
    chrome.storage.sync.get(
        {
          stickerDataSource: []
        },
        async function(item) {
          item.stickerDataSource.splice(selectedStickerIndex, 1);
          chrome.storage.sync.set(item, async function() {

            const stickerList = JSON.parse(JSON.stringify(stickers));
            stickerList.splice(selectedStickerIndex, 1);
            chrome.storage.local.set({
              COT_STICKER_LIST: stickerList,
            }, () => {
              setSelectedStickerIndex(0);
              setStickers(stickerList);
            });
          });
        }
    );
  }

  return <div className="OptionsContainer">
    <header
        className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">ChatOps Stickers Collection</a>
      <button className="navbar-toggler position-absolute d-md-none collapsed"
              type="button" data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <input className="form-control form-control-dark w-100 rounded-0 border-0"
             onInput={(e) => setNewCollectionUrl(e.target.value)}
             value={newCollectionUrl}
             type="url" placeholder="Sticker json url. Example: https://dl.dropboxusercontent.com/s/lmxis68cfh4v1ho/default.json?dl=1"
             aria-label="Sticker json url: https://dl.dropboxusercontent.com/s/lmxis68cfh4v1ho/default.json?dl=1" />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#" onClick={onAddCollection}>Add sticker set</a>
          </div>
        </div>
    </header>

    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu"
             className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
              {stickers.map((item, index) => {
                return (
                    <li className="nav-item">
                      <a className={`nav-link ${selectedStickerIndex === index ? 'active' : ''}`} aria-current="page" href="#" onClick={(e) => {
                        e.preventDefault();
                        setSelectedStickerIndex(index);
                      }}>
                        <span data-feather="home"
                              className="align-text-bottom"></span>
                        {item.name}
                      </a>
                    </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {stickers.length > 0 && (
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <div className="d-flex justify-content-between">
                <h1 className="h2">{stickers[selectedStickerIndex].name} <span
                    className="badge rounded-pill text-bg-primary">{stickers[selectedStickerIndex].type}</span></h1>
                {stickers[selectedStickerIndex].type === 'customize' && (
                    <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                )}
              </div>
              <div>
                <code>{stickers[selectedStickerIndex].src}</code>
              </div>
              <div className="mt-5 images">
                {
                  stickers[selectedStickerIndex]?.data?.map(item => {
                    return <img src={item.src} title={item.key} alt={item.key}/>
                  })
                }
              </div>
            </div>)}
        </main>
        {message !== '' && (
          <div className="modal fade show" style={{display: 'block'}} data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Message</h5>
                  <button type="button" className="btn-close"
                          data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                    setMessage('')}
                  }></button>
                </div>
                <div className="modal-body">
                  <p>{message}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary"
                          data-bs-dismiss="modal" onClick={() => {
                          setMessage('')}
                  }>Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>;
};

export default Options;
