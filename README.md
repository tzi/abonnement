abonnement
======

Tiny JavaScript library to handle event callback registration.

Highlights:

 * No dependencies
 * Usable in vanilla JavaScript, even ES5
 * Tiny! Weighs under 1kB
 
Usage
------

Install the library:

```
npm install abonnement --save
```

Use it in any JavaScript object:

```js
// Create a new context
const events = abonnement();

// Get an registering function 
const onNewData = events.getRegisterHandler('newData');

// Subscribe to "newData" events  
onNewData(data => console.log(data));

// Trigger a newData event
events.trigger('newData');
```
 
Modular Architecture Example
------

The main purpose of *abonnement* is to simplify modular architecture in an ES5 context.

The event handler pattern allow us to connect modules without having explicit dependencies.

```js
// First, I create one module that will handle some data
function createBack() {
  const events = abonnement();
  setTimeout(() => events.trigger('end'), 3000);

  return {
    onEnd: events.getRegisterHandler('end')
  };
}

// Then, I create another module that will handle the output
function createFront() {
  function display(message) {
    console.log(message);
  }

  return {
    display
  };
}

// Finally, I create the App that will links the modules together
const back = createBack();
const front = createFront();
back.onEnd(function() {
  front.display("Time out!");
});
```

API
------

### Event triggering

```js
const events = abonnement();

// Trigger an event
events.trigger('end');

// Trigger an event with data
events.trigger('newData', { id: 'john' });
```

### Event subscription
 
 ```js
const events = abonnement();

// Subscribe to an event
const onEnd = events.getRegisterHandler('end');
onEnd(() => console.log('Time out!'));

// Treat event data
const onNewData = events.getRegisterHandler('newData');
onNewData(data => console.log(`New user connected: ${data.id}`));

// Filtering events by the data
onNewData({ id: 'john' }, data => console.log('John is connected'));

// Filtering events by id
onNewData('john', data => console.log('John is connected'));

// Declare a custom id field
const onNewData = events.getRegisterHandler('newData', 'name');
onNewData('John', data => console.log('John is connected'));
events.trigger('newData', { id: 76, name: 'John' });
```


## License

MIT. Copyright (c) [Thomas Zilliox](https://tzi.fr).

