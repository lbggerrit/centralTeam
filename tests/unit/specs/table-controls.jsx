

var chai = require( 'chai' ), // Or Chai if desired
		React = require( 'react/addons' ),
		jasmineReact = require( '../_jasmine-react.js' ),
		jsdom = require('jsdom'),
		fluxMock = require('../_fluxmock.js');




chai.should();

var TestUtils = React.addons.TestUtils,
	detachedComp = null;


describe('Key Value List Renderer', function() {

	var TableControls = require( '../../../app/components/table/table-controls.jsx' );

	var container = null,
			resetButtonNode = null,
			incrementParagraphNode = null,
			testComponent = null,
			defaultTestProps = {
				limit: 10,
				storeName: 'tableStore',
				setLimitAction: 'SET_LIMIT'
			};

	function buildComponent(props) {
		testComponent = jasmineReact.render( <TableControls {...props} />, container);
	}

	beforeAll( function( done ){
		jsdom.env({
			html: "<html><body></body></html>",
			done: function( error, window ) {
				global.window				= window;
				global.document 		= window.document;
				global.navigator    = window.navigator;

				container = document.createElement("div");
				done();
			}
		});


		fluxMock.mock();
		require('../../../app/flux/stores/tableStore.js');
	});

	afterAll( function(){
		fluxMock.unmock();
	});



	afterEach( function(){

		React.unmountComponentAtNode(React.findDOMNode(testComponent).parentNode);

	});

	it('should exist', function(){
		buildComponent(defaultTestProps);
		expect(TestUtils.isCompositeComponent(testComponent)).toBeTruthy();
	});

	it('should fire a flux action when the limit is changed', function(done){
		buildComponent(defaultTestProps);

		var deregisterListener = fluxMock.addActionListener(function(action,payload){
				action.should.eql('SET_LIMIT');
				payload.limit.should.eql('4');
				done();
			}),
			limitInput = testComponent.refs.limit.getDOMNode();

		limitInput.value = 4;
		React.addons.TestUtils.Simulate.change(limitInput);

		deregisterListener();
	});


});
