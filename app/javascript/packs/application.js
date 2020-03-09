// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

const App = (function App() {
  const root = document.documentElement;
  let ul;

  const getLists = function getLists() {
    return fetch('http://localhost:3027/spaces/snail-giraffe-alligator.json')
      .then((response) => response.json());
  };

  const getTokens = function getTokens(listId) {
    return fetch(`http://localhost:3027/lists/${listId}/tokens.json`)
      .then((response) => response.json());
  }

  const listItemClicked = function listItemClicked(e) {
    getTokens(e.target.dataset.id)
      .then((tokens) => {
        defineRootStyles(tokens);
      });
  };

  const defineRootStyles = function defineRootStyles(tokens) {
    // console.log(`received tokens: ${tokens}`);
    tokens.forEach(({ name, value }) => {
      root.style.setProperty(`--remote-${name}`, value);
    });
  };

  const updateListsElement = function updateListsElement(lists) {
    ul.innerHTML = '';
    lists.forEach((list) => {
      const li = document.createElement('li');
      li.innerText = list.name;
      li.classList.add('token-list-switcher__list-item');
      li.setAttribute('data-id', list.id);
      li.addEventListener('click', (e) => listItemClicked(e));
      ul.append(li);
    });
  };

  return {
    init () {
      ul = document.querySelector('.token-list-switcher__lists');

      getLists()
        .then((lists) => updateListsElement(lists));
    },
  };
}());

if (document.readyState !== 'loading') {
  App.init();
} else {
  document.addEventListener('DOMContentLoaded', App.init)
}



// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// const root = document.documentElement;

// const applyTheme = function applyTheme(listId) {
//   fetch(`http://localhost:3000/lists/${1}/tokens.json`)
//     .then((response) => response.json())
//     .then((jsObject) => updateCSSProperties(jsObject));
// };

// const applyLightTheme = function applyLightTheme() {
//   localStorage.setItem('activeTheme', 'light');
//   applyTheme(6);
// };

// const applyDarkTheme = function applyDarkTheme() {
//   localStorage.setItem('activeTheme', 'dark');
//   applyTheme(7);
// };

// const updateCSSProperties = function updateCSSProperties(tokens) {
//   tokens.forEach(({ name, value }) => {
//     root.style.setProperty(`--remote-${name}`, value);
//   });
// }

// const app = (function buildApp() {
//   return {
//     init() {
//       console.log(`document.readyState: ${document.readyState}`);
//       console.log('app init');

//       const activeTheme = localStorage.getItem('activeTheme');
//       const lightThemeButton = document.getElementById('light-theme-button');
//       const darkThemeButton = document.getElementById('dark-theme-button');

//       lightThemeButton.addEventListener('click', applyLightTheme);
//       darkThemeButton.addEventListener('click', applyDarkTheme);

//       if (activeTheme === 'light') {
//         applyLightTheme();
//       } else {
//         applyDarkTheme();
//       }
//     }
//   };
// }());

