<img src="src/assets/img/icon-128.png" width="64"/>

# ChatOps Toolkit Chrome Extension

## Features

A chrome extension add more future and funny stickers for ChatOps
Extending Chatops features, funny emoticons and useful features will help you enjoy ChatOps

Extending Chatops allows you to add fun stickers to your ChatOps is a useful tool to help you create more engaging conversations. 
This extension provides you with hundreds of fun, diverse and colorful stickers for you to add to your conversations.
Additionally, the extension also provides you with the ability to customize the stickers to your liking. 
You can also create your own stickers by using the tools provided by the extension. The extension can also be used on different browsers such as Google Chrome, Microsoft Edge. 
T his extension will help you create more engaging conversations, allowing you to chat with your friends in a fun and engaging way.

## Installing and Running

### For production

Now available in Google Chrome store

[![](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/mPGKYBIR2uCP0ApchDXE.png)](https://chrome.google.com/webstore/detail/chatops-toolkit/hdoikfgkppfdpofnolmplcekepaggckg)

### For development

Requirements:
- Node 18.x

Installation step:
- Clone this repository
- Run command for init env
```bash
yarn install

# development mode
yarn start

# build mode

NODE_ENV=production yarn build
```

## Structure

All your extension's code must be placed in the `src` folder.

The app is already prepared to have a popup, an options page, a background page, and a new tab page (which replaces the new tab page of your browser). But feel free to customize these.


## Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

## Copyright (c) 2023 by ThienLV | [Website](https://fb.com.ohmygodvt95)
