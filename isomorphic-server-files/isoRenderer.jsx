var React = require('react'),
	ReactRouter = require('react-router'),
	history = require('history'),
	routeHistory = require('../app/utils/routeHistory.jsx');

var RoutingContext = ReactRouter.RoutingContext;


function getRoutes( journeyId ) {
	var routes = require('../app/journeys/' + journeyId + '/' + journeyId + '.routes.jsx');

	if(!routes) {
		throw new Error('Routes not found');
	}
	return routes();
}

function renderPageHtml(journeyId, url, callback) {

	var renderHistory = routeHistory.createHistory();
	var location = history.createLocation(url);

	// Replace page with / since page path shouldn't be included.
	if(location.pathname.indexOf('/page/') === 0 ) {
		location.pathname = '/' + location.pathname.split('/').slice(3).join('/');
	}

	ReactRouter.match({
		routes:getRoutes(journeyId),
		location,
		history:renderHistory
		}, function( error, redirectLocation, renderProps ){

			if (redirectLocation) {
				callback( null, redirectLocation );

			} else if (error) {
				error.responseCode = 500;
				callback( error );

			} else if (renderProps == null) {
				callback( {error: 'Page not found', responseCode: 404 } );

			} else {
				callback( null, null, React.renderToString(<RoutingContext {...renderProps}/>));
			}
		});
}

module.exports = {
	renderPageHtml
}
