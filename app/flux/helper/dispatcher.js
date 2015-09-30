var dispatching = false,
	dispatchers = {};

/**
 * @class Dispatcher
 * @description a straightforward dispatch class that includes the ability to
 *              dispatch events to stores and fire on change listeners after
 *              each dispatch.
 */
class Dispatcher {
	constructor(store) {
		this.storeName = store.storeName;
		this.store = store;
		this.listeners = [];
	}
	dispatch(payload) {
		var i;

		if (dispatching) {
			throw new Error( 'Cannot dispatch multiple actions at once' );
		}
		if (!payload.action) {
			throw new Error( 'Action undefined' );
		}

		dispatching = true;
		try {
			this.store.setState(
				this.store.reducer(
					this.store.getState(), payload
				)
			);
			for (i = 0; i < this.listeners.length; ++i) {

				this.listeners[ i ](payload);
			}
		} catch (e) {
			// make sure errors don't block the dispatcher
			dispatching = false;
			throw(e);
		}

		dispatching = false;

	}

	addListener( listenFunc, unsafe ) {

		if (!unsafe && frameworkGlobals.isServer) {
			return function() {
				return true;
			};
		}

		this.listeners.push( listenFunc );

		return (function() {
			var listenIndex = this.listeners.indexOf( listenFunc );

			if (listenIndex > -1) {

				this.listeners.splice( listenIndex, 1 );
				return true;
			}

			return false;
		}).bind(this);
	}
}

/**
 * @class DispatcherMultiton
 * @description manager class, used to store and return dispatchers as they are
 *              individual singleton objects.
 */
class DispatcherMultiton {
	constructor() {
		dispatchers = {};
	}
	/**
	 * @description takes a Store object and returns/creates a dispatcher singleton
	 * @param  {Store} store Store object to get the dispatcher from
	 * @return {Dispatcher}       Dispatcher object associated with the passed Store
	 */
	get(store) {
		if (!dispatchers[store.storeName]) {

			dispatchers[store.storeName] = new Dispatcher(store);
		}

		return dispatchers[store.storeName];
	}
}

module.exports = new DispatcherMultiton();
