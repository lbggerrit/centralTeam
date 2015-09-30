var chai = require( 'chai' ), // Or Chai if desired
		React = require( 'react/addons' ),
		jasmineReact = require( '../_jasmine-react.js' ),
		jsdom = require('jsdom');

chai.should();

var TestUtils = React.addons.TestUtils,
	detachedComp = null;


describe('Key Value List Renderer', function() {

	var Snippets = require( '../../../app/components/_snippets/index.jsx' );

	var container = null,
			resetButtonNode = null,
			incrementParagraphNode = null,
			testComponent = null;

	function buildComponent(props) {
		testComponent = jasmineReact.render( <Snippets.KeyValueList {...props} />, container);
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
	});



	afterEach( function(){

		React.unmountComponentAtNode(React.findDOMNode(testComponent).parentNode);

	});

	it('should exist', function(){
		buildComponent({content:{},maxKeys:Infinity,hideId:false});
		expect(TestUtils.isCompositeComponent(testComponent)).toBeTruthy();
	})

	it('should take null as an option for content', function(){
		buildComponent({content:null,maxKeys:Infinity,hideId:false});
		expect(TestUtils.isCompositeComponent(testComponent)).toBeTruthy();
	})

	it('should build an empty div if there\'s no content keys', function(){

		buildComponent({content:{},maxKeys:Infinity,hideId:false});

		var containers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'div');
		containers.length.should.eql(1);

	});

	it('should render a single key value pair', function(){

		buildComponent({content:{Test:'values'},maxKeys:Infinity,hideId:false});

		var containers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'div');
		containers.length.should.eql(2);

		var keyValueContainers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'span');
		keyValueContainers.length.should.eql(2);

		keyValueContainers[0].getDOMNode().textContent.should.eql('Test');
		keyValueContainers[1].getDOMNode().textContent.should.eql('values');

	});

	it('should render multiple key value pairs', function(){

		buildComponent({content:{Test:'values',Test2:1},maxKeys:Infinity,hideId:false});

		var containers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'div');
		containers.length.should.eql(3);

		var keyValueContainers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'span');
		keyValueContainers.length.should.eql(4);

		keyValueContainers[0].getDOMNode().textContent.should.eql('Test');
		keyValueContainers[1].getDOMNode().textContent.should.eql('values');
		keyValueContainers[2].getDOMNode().textContent.should.eql('Test2');
		keyValueContainers[3].getDOMNode().textContent.should.eql('1');

	});

	it('should show reformatted key strings', function(){

		buildComponent({content:{fOrMaTtInG_tEsT:'val'},maxKeys:Infinity,hideId:false});

		var keyContainer = TestUtils.findRenderedDOMComponentWithClass(testComponent, 'key');

		keyContainer.getDOMNode().textContent.should.eql('Formatting Test');
	});

	it('should hide the id key if hideId is true', function(){

		buildComponent({content:{id:5,Next:'Value'},maxKeys:Infinity,hideId:true});

		var containers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'div');
		containers.length.should.eql(2);

		var keyValueContainers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'span');
		keyValueContainers.length.should.eql(2);

		keyValueContainers[0].getDOMNode().textContent.should.eql('Next');
		keyValueContainers[1].getDOMNode().textContent.should.eql('Value');
	});
	it('should restrict the number of rendered pairs if max keys is lower than the content key count', function(){

		buildComponent({content:{Test:'values',Test2:1,Hidden:'value'},maxKeys:2,hideId:false});

		var containers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'div');
		containers.length.should.eql(3);

		var keyValueContainers = TestUtils.scryRenderedDOMComponentsWithTag(testComponent, 'span');
		keyValueContainers.length.should.eql(4);

		keyValueContainers[0].getDOMNode().textContent.should.eql('Test');
		keyValueContainers[1].getDOMNode().textContent.should.eql('values');
		keyValueContainers[2].getDOMNode().textContent.should.eql('Test2');
		keyValueContainers[3].getDOMNode().textContent.should.eql('1');

	})

});
