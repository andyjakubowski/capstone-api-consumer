import consumer from "./consumer"

const root = document.documentElement;
const SPACE_NAME = 'cod-wolf-crab';
const storage = window.localStorage;

const activeListId = function activeListId() {
  return Number(storage[`activeListId#${SPACE_NAME}`]) || null;
};

const updateStyles = function updateStyles(tokens) {
    root.style = '';

    tokens.forEach(({ name, value }, index) => {
      root.style.setProperty(`--remote-${name}`, value);
    });
  };

consumer.subscriptions.create({ channel: "ListChannel", space_name: SPACE_NAME }, {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log(`Client app connected to ListChannel#${SPACE_NAME}`);
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(`Received broadcast for list_id: ${data.list_id}`);
    console.log(`Active list_id: ${activeListId()}`);
    if (data.list_id === activeListId()) {
      updateStyles(data.tokens);
    }
  }
});
