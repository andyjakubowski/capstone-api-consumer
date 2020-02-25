// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

const root = document.documentElement;

const refreshStyles = function refreshStyles() {
  fetch('https://andy-capstone-week-03.herokuapp.com/lists/6/tokens.json')
    .then((response) => response.json())
    .then((jsObject) => updateCSSProperties(jsObject));
};

const updateCSSProperties = function updateCSSProperties(tokens) {
  tokens.forEach(({ name, value }) => {
    root.style.setProperty(`--remote-${name}`, value);
  });
}

const app = (function buildApp() {
  return {
    init() {
      console.log(`document.readyState: ${document.readyState}`);
      console.log('app init');

      const refreshStylesButton = document.getElementById('refresh-styles-button');
      refreshStylesButton.addEventListener('click', refreshStyles);

      refreshStyles();
    }
  };
}());

if (document.readyState !== 'loading') {
  app.init();
} else {
  document.addEventListener('DOMContentLoaded', app.init)
}
