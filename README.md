# abonnement

Tiny JavaScript library to handle event callback registration.

Highlights:

* Help write modular code
* Usable in vanilla JavaScript, even ES5
* Tiny and no dependencies! Weighs under 1kB

## Installation

Download [abonnement.min.js](https://raw.githubusercontent.com/tzi/abonnement/master/abonnement.min.js) or get it with npm:

```
npm install abonnement --save
```

Create a global `abonnement` variable in ES5:

```html
<script src="abonnement.min.js></script>
```

Import it with ES6:

_ES6 support is coming_

## Modular Architecture Example

The main purpose of _abonnement_ is to simplify modular architecture in an ES5 context.

The event handler pattern allow us to connect modules without having explicit dependencies.

```js
/* First, I create one module that will handle some data */
function createBack() {
  // Create a new context
  const events = abonnement();

  setTimeout(function() {
    // Trigger an "end" event
    events.trigger("end");
  }, 3000);

  // Expose an "end" event registering function
  return {
    onEnd: events.getRegisterHandler("end")
  };
}

/* Then, I create another module that will handle the output */
function createFront() {
  function display(message) {
    console.log(message);
  }

  return {
    display
  };
}

/* Finally, I create the App that will links the modules together */
const back = createBack();
const front = createFront();

// Subscribe to "end" events
back.onEnd(function() {
  front.display("Time out!");
});
```

## API

### Event triggering

```js
const events = abonnement();

// Trigger an event
events.trigger("end");

// Trigger an event with data
events.trigger("newData", { id: "john" });
```

### Event subscription

```js
const events = abonnement();

// Subscribe to an event
const onEnd = events.getRegisterHandler("end");
onEnd(() => console.log("Time out!"));

// Treat event data
const onNewData = events.getRegisterHandler("newData");
onNewData(data => console.log(`New user connected: ${data.id}`));

// Filtering events by the data
onNewData({ id: "john" }, data => console.log("John is connected"));

// Filtering events by id
onNewData("john", data => console.log("John is connected"));

// Declare a custom id field
const onNewData = events.getRegisterHandler("newData", "name");
onNewData("John", data => console.log("John is connected"));
events.trigger("newData", { id: 76, name: "John" });
```

## License

MIT. Copyright (c) [Thomas Zilliox](https://tzi.fr).
