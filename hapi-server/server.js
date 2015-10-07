/* eslint-disable */
/* jscs: disable */

import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';
// import HapiReactViews from 'hapi-react-views';
import Config from 'config';
import path from 'path';
import fluxForm from '../isomorphic-server-files/flux-form';
import isoRenderer from '../isomorphic-server-files/isoRenderer.jsx';
import storeManager from '../app/flux/helper/storeManager.js';
import Yar from 'yar';

const cssFile = Config.get('appFiles.css');
const jsBundle = Config.get('appFiles.clientJS');
const assetsDir = path.join(__dirname, '../app/assets');
const dataDir = path.join(__dirname , '../mockdata');
const viewPath = '../app/journeys/';

// Create a server and set statis dir to dist
const server = new Hapi.Server();

// Set server configuration
server.connection({
	host: Config.get('host'),
	port: Config.get('port')
});

// Register plugins
server.register([Vision, Inert], (err) => {
	if (err) {
		console.log("Failed to load one or more plugins.");
	}
});

var options = {
	storeBlank: true,
	cookieOptions: {
		password: 'password123',
		isSecure: false
	}
};

server.register({
	register: require('yar'),
	options: options
}, function (err) {
	if(err) {
		console.log("Failed to load one or more plugins.");
	}
});

// Set React view engine
server.views({
	engines: {
		ejs: require('ejs')
	},
	relativeTo: __dirname,
	path: viewPath
});

global.isNodeServerApplication = true;

function getSessionID(request) {
	return request.session.id;
}

function renderPageToUser(sessionID, pageId, url, reply){
	storeManager.setSessionName(sessionID);
	isoRenderer.renderPageHtml(pageId, url, function(error, redirect, html){
		reply.view('layout', {
			reactOutput: html,
			pageId: pageId,
			stores: fluxForm.getStoreStates(),
			basePath:frameworkGlobals.basePath,
			pageTitle: 'React framework'
		});
	});
}

server.route({
	method: 'GET',
	path: '/flux/action/{storeName}/{actionName}/',
	handler: function (request, reply) {
		var actionResults = fluxForm.handleFluxAction(
			getSessionID(request),
			request.params.storeName,
			request.params.actionName,
			request.url.query,
			request.url.query.redirect
		),
		redirectUrl;

		if (actionResults.error) {
			return reply(actionResults.message).code(500);
		}
		redirectUrl = actionResults.url;

		if (actionResults.useReferringUrl) {
			redirectUrl = request.info.referrer;

		} else if (!actionResults.url) {

			return reply({
				storeName: request.params.storeName,
				actionName: request.params.actionName,
				query: request.url.query
			});
		}

		return reply.redirect(redirectUrl);
	}
});

server.route({
	method: 'GET',
	path: '/flux/clear/',
	handler: function (request, reply) {
		fluxForm.clear(getSessionID(request));
		reply();
	}
});
server.route({
	method: 'POST',
	path: '/flux/update/{storeName}/',
	handler: function (request, reply) {
		if (request.payload && request.payload.diff) {
			fluxForm.update(getSessionID(request), request.params.storeName, request.payload.diff);
		}
		reply();
	}
})

server.route({
	method: 'GET',
	path: '/page/{pageId}/',
	handler: function (request, reply) {
		frameworkGlobals.basePath = '/page/' + request.params.pageId;
		renderPageToUser(getSessionID(request), request.params.pageId, request.url.path, reply);
	}
});

// Add the routes
server.route({
	method: 'GET',
	path: '/{path*}',
	handler: function (request, reply) {
		frameworkGlobals.basePath = '';
		renderPageToUser(getSessionID(request), 'example', request.url.path, reply);
	}
});

server.route({
	method: 'GET',
	path: '/assets/{param*}',
	handler: {
		directory: {
			path: 'app/assets'
		}
	}
});

server.route({
	method: 'GET',
	path: '/data/{param*}',
	handler: {
		directory: {
			path: 'mockdata'
		}
	}
});

// Start the server
server.start(function () {
	console.log('Server running at:', server.info.uri);
});
