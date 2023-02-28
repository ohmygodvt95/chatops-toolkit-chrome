import React from 'react';
import logo from '../../assets/img/icon-128.png';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Customize your stickers
        </p>
        <a
          className="App-link"
          href="/options.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Setting
        </a>
      </header>
    </div>
  );
};

export default Popup;
