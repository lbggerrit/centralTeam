##flux

Flux is a design pattern directed towards providing a unidirectional data flow. Flux is _not_ MVC.

[Flux Documents](https://facebook.github.io/flux/docs/overview.html)


##Flux pattern

A flux flow consists of 3 different parts, the Action, Dispatcher and the Store.

###Store

Stores both store the data, as "states", that's used by react's views, and modifies that data
through the use of a single function called a reducer.

A reducer is a simple function that receives the current state of the store and
a payload then returns a modified version of that state.

Reducers are always synchronous and only perform simple actions on the state.
They _NEVER_ perform actions or save data outside of the state.

####Example

	var storeClass = require('../helper/class/store.js');
	var exampleStore extends storeClass {
		constructor() {
			super('exampleStore', {
				exampleCounter: 0,
				exampleBoolean: false,
				exampleString: 'Hello World',
				exampleAsyncBool: false
			})
		}
		reducer (state, payload) {
			switch(payload.action) {
				this.actions.INCREMENT_COUNTER:
					state.exampleCounter++;
					return state;

				this.actions.SET_BOOLEAN:
					state.exampleBoolean = payload.payloadBoolean;
					return state;

				this.actions.SAYING_GOODBYE:
					state.exampleAsyncBool = true;
					return state;
				this.actions.SAY_GOODBYE:
					state.exampleAsyncBool = false;
					state.exampleString = 'See ya later!';
					return state;
				this.actions.SAID_GOODBYE:
					state.exampleAsyncBool = false;
					state.exampleString = 'We already said goodbye...';
					return state;
				default:
					return state;
			}
		}
	}

	module.exports = new exampleStore();

In the example above we're showing a basic store. In this store we have a reducer that can change state of the store through 5 separate actions. Actions are described later down in the readme.

##Dispatcher

The dispatcher is the middle layer between Actions and the store. By having a dispatcher Flux can set the rule of only having one Action being processed at a time. Having the dispatcher helps follow the idea of a unidirectional data flow. The dispatcher is manually called from your actions.

	var fluxHelper = require('../helper.js');

	fluxHelper('exampleStore').dispatch({
		action:'SET_BOOLEAN',
		payloadBoolean: false
	});

##Actions

Actions are functions that the application calls to modify the state of the store. Unlike the store's reducer function actions can do a lot more, including communicating with the server, saving cookies or checking security.

When are store is created default action functions are automatically created. So if the action doesn't require complex logic then it's unnecessary to write a separate function for each action.

###Example

	var actionsClass = require('../helper/class/actions.js');

	class exampleActions extends actionsClass {
		constructor() {
			super('exampleStore');
		}
		SAYING_GOODBYE (payload){
			//get our store to dispatch the actions on
			var exampleStore = this.getStore();

			//tell the dispatcher to dispatch that we're saying goodbye
			exampleStore.dispatch({
					action:this.actions.SAYING_GOODBYE
			});

			//Asynchronous example simulated using setTimeout
			setTimeout((function(){
				//normally we'd have data returned from the library
				// in this case lets assume that data would check if we've
				// already said goodbye. For now we'll use the store's current
				// state to determine that.
				if(exampleStore.getState().exampleString === 'Hello World') {
					exampleStore.dispatch({
						action:this.actions.SAY_GOODBYE
					});
				} else {
					exampleStore.dispatch({
						action.this.actions.SAID_GOODBYE
					});
				}
			}).bind(this),1000);

		}
	}

	module.exports = new exampleActions();

Now if you've been following through the whole document you'll notice we've been referencing "actions" but we haven't defined what those actions are yet. The actions definitions are called actionConstants. Within each application there's a single file that defines all the possible action constants for each tableStore and is shared across all flux libraries.

##Action Constants

Action Constants are the strings that we refer to when firing actions and building reducers. The library keyMirror is used to created mirrored constant strings, so a key such as INCREMENT_COUNTER would have an identical string value of 'INCREMENT_COUNTER'.

All actions must refer to the store that they perform the action on. This is shown in the example below.

###Example

	var constantsClass = require('../helper/class/constants.js'),
		 keyMirror = require('keyMirror');

	class actionConstants extends constantsClass {
		constructor() {
			super({
				exampleStore: keyMirror({
					INCREMENT_COUNTER: null,
					SET_BOOLEAN: null,
					SAYING_GOODBYE: null,
					SAY_GOODBYE: null,
					SAID_GOODBYE
				}),
				otherStore: keyMirror({
					OTHER_UNRELATED_ACTION: null
				})
			});
		}
	}

	module.exports = new actionConstants();

##Flux Helper

Flux helper makes it easy to use our stores and actions throughout our react application. It pulls all the classes together to create a single store helper class that exposes a limited subset of functions.

###Setting the state of a React from a store

	var React = require('react'),
		fluxHelper = require('../flux/helper.js');

	var ExampleReactComponent = React.createClass({
		getInitialState: function(){
			var exampleStore = fluxHelper('exampleStore');
			return {
				...example.getState()
			}
		}
	...


###Updating the state of the component when the store state has changed

	...
		componentWillMount: function(){
			var unmountStoreListener = fluxHelper('exampleStore').addListener(this.updateStateFromStore);
		},
		componentWillUnmount: function(){
			unmountStoreListener();
		},
		updateStateFromStore: function(){
			this.setState(fluxHelper('exampleStore').getState());
		}
	...

###Firing an action within a component

	...
		componentOnClickHandler: function(){
			//when a user clicks something increment the counter
			fluxHelper('exampleStore').fireAction('INCREMENT_COUNTER')();
		},
		goodbyeHandler: function(){
			fluxHelper('exampleStore').fireAciton('SAY_GOODBYE')();
		},
		render: function(){
			return (
					<div onClick={this.componentOnClickHandler}>
						{this.state.exampleString}
						<div>
							Counter: {this.state.exampleCounter}
						</div>
						<div>
							Getting data from the server: {this.state.exampleAsyncBool}
						</div>
						<button onClick={this.goodbyeHandler}>
							Say Goodbye!
						</button>
					</div>
			)
		}
	}


##FluxForm
FluxForm is a set of react components used in conjunction with serverside code to allow for a seamless isomorphic application, without having to write extra server code to fire flux actions.

- FluxForm
- FluxFormProperty
- FluxFormSubmit
- FluxNoJs  
