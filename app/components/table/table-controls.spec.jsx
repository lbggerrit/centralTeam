var chai = require('chai'), // Or Chai if desired
	React = require('react/addons'),
	jasmineReact = require('../../../tests/unit/_jasmine-react.js'),
	jsdom = require('jsdom'),
	fluxMock = require('../../../tests/unit/_fluxmock.js'),
	TestUtils = React.addons.TestUtils;

chai.should();

describe('Key Value List Renderer', function() {

	var TableControls = require( '../../../app/components/table/table-controls.jsx' );

	var container = null,
		testComponent = null,
		defaultTestProps = {
			limit: 10,
			storeName: 'tableStore',
			setLimitAction: 'SET_LIMIT'
		};

	function buildComponent(props) {
		testComponent = jasmineReact.render( <TableControls {...props} />, container);
	}

	beforeAll( function( done ) {
		jsdom.env({
			html: '<html><body></body></html>',
			done: function( error, window ) {
				global.window = window;
				global.document = window.document;
				global.navigator = window.navigator;

				container = document.createElement('div');
				done();
			}
		});

		fluxMock.mock();
		require('../../../app/flux/stores/tableStore.js');
	});

	afterAll(function() {
		fluxMock.unmock();
	});

	afterEach(function() {
		React.unmountComponentAtNode(React.findDOMNode(testComponent).parentNode);
	});

	it('should exist', function() {
		buildComponent(defaultTestProps);
		expect(TestUtils.isCompositeComponent(testComponent)).toBeTruthy();
	});

	it('should fire a flux action when the limit is changed', function(done) {
		var deregisterListener,
			limitInput;

		buildComponent(defaultTestProps);

		deregisterListener = fluxMock.addActionListener(function(action, payload) {
			action.should.eql('SET_LIMIT');
			payload.limit.should.eql('4');
			done();
		});
		limitInput = testComponent.refs.limit.getDOMNode();

		limitInput.value = 4;
		React.addons.TestUtils.Simulate.change(limitInput);

		deregisterListener();
	});

});
