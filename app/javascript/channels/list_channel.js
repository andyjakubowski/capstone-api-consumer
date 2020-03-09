import consumer from "./consumer"

const root = document.documentElement;

consumer.subscriptions.create("ListChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('Client app connected to ListChannel');
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(`Client received data`);
    const tokens = data.list;
    
    tokens.forEach(({ name, value }) => {
      root.style.setProperty(`--${name}`, value);
    });
  }
});
