var
	React = require('react'),
	routes = require('./example.routes.jsx');
	// Register = require('./example.register.js'), // define stores first
	// ExampleLayout = require('./controller-views/example-layout.jsx');

React.render(routes(), document.getElementById('app'));
