var React = require('react'),
	Register = require('./example.register.js'), // define stores first
	ReactRouter = require('react-router'),
	TableLayoutController = require('./controller-views/example-layout.jsx'),
	TestLayoutController = require('./controller-views/test-layout.jsx'),
	routeHistory = require('../../utils/routeHistory.jsx'),
	// Route
	Route = ReactRouter.Route,
	Router = ReactRouter.Router;

module.exports = function() {
	var history = routeHistory.createHistory();

	return (
		<Router history={history}>
			<Route path='/' component={TableLayoutController} />
			<Route path='/test' component={TestLayoutController} />
		</Router>
	);
	// return (
	// 	<Route name="root" path="/" handler={require('./handlers/Root')}>
	//     <Route name="contact" path="contact/:id" handler={require('./handlers/Contact')} />
	//     <Route name="newContact" handler={require('./handlers/NewContact')} />
	//     <Route name="createContact" handler={CreateContact} />
	//   </Route>,
	//   <NotFoundRoute name="not-found" handler={require('./handlers/NotFound')}/>
	// );
};
