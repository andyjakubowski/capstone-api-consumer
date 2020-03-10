// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

const App = (function App() {
  const SPACE_NAME = 'cod-wolf-crab';
  const root = document.documentElement;
  let ul;

  const getLists = function getLists() {
    return fetch(`http://localhost:3027/spaces/${SPACE_NAME}.json`)
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
