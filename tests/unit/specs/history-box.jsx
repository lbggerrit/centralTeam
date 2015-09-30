var chai = require( 'chai' ), // Or Chai if desired
		React = require( 'react/addons' ),
		jasmineReact = require( '../_jasmine-react.js' ),
		jsdom = require('jsdom');

chai.should();

var TestUtils = React.addons.TestUtils,
	detachedComp = null;


describe('History Box Renderer', function() {

	var HistoryBox = require( '../../../app/components/history-box/history-box.jsx' );

	var container = null,
			resetButtonNode = null,
			incrementParagraphNode = null,
			testComponent = null;

	function buildComponent(props) {
		testComponent = jasmineReact.shallowRender( <HistoryBox {...props} />, container);
	}

	it('should exist', function(){
		buildComponent({data:[],maxKeys:Infinity,maxHistory:'3',ids:[],title:'history'});

		testComponent.type.should.eql('div');
	});

	it('should have a header with a predefined title', function(){
		buildComponent({data:[],maxKeys:Infinity,maxHistory:'3',ids:[],title:'test header'});

		testComponent.props.children[0].type.should.eql('div');
		testComponent.props.children[0].props.children.should.eql('test header');
	});

	it('should have warning message stating there are no history items', function(){
		buildComponent({data:[],maxKeys:Infinity,maxHistory:'3',ids:[],title:'test header'});

		testComponent.props.children[1].type.should.eql('ul');
		testComponent.props.children[1].props.children.props.children.should.eql('No active history');
	});

	it('should render a list item with a KeyValueList in it', function(){
		buildComponent({data:[{id:0,test:'value',example:'key'}],maxKeys:Infinity,maxHistory:'3',ids:[0],title:'test header'});

		var historyList = testComponent.props.children[1],
			historyItem = historyList.props.children[0],
			keyValueList;

		historyItem.type.should.eql('li');
		keyValueList = historyItem.props.children;
		keyValueList.type.displayName.should.eql('KeyValueList');

	});

	it('should render a set of list items with KeyValueList components in them', function(){
		var testData = [
			{id:0,test:'value',example:'key'},
			{id:1,test:'value2',example:'key2'},
			{id:2,test:'value3',example:'key3'}
		];
		buildComponent({
			data:testData,
			maxKeys:Infinity,
			maxHistory:'3',
			ids:[0,1,2],
			title:'test header'
		});

		var historyList = testComponent.props.children[1],
			historyItems = historyList.props.children,
			keyValueList,
			historyItem,
			i;

		historyItems.length.should.eql(3);

		for( i = 0; i < historyItems.length; ++i) {
			historyItem = historyItems[i];
			historyItem.type.should.eql('li');
			keyValueList = historyItem.props.children;
			keyValueList.props.content.should.eql(testData[i])
			keyValueList.type.displayName.should.eql('KeyValueList');
		}
	});

	it('should render a subset of history items based off of the maxHistory number', function(){
		var testData = [
				{id:0,test:'value',example:'key'},
				{id:1,test:'value2',example:'key2'},
				{id:2,test:'value3',example:'key3'}
			],
			testMaxHistory = 2;

		buildComponent({
			data:testData,
			maxKeys:Infinity,
			maxHistory:testMaxHistory,
			ids:[0,1,2],
			title:'test header'
		});

		var historyList = testComponent.props.children[1],
			historyItems = historyList.props.children,
			keyValueList,
			historyItem,
			i;

		historyItems.length.should.eql(2);

		for( i = 0; i < historyItems.length; ++i) {
			historyItem = historyItems[i];
			historyItem.type.should.eql('li');
			keyValueList = historyItem.props.children;
			keyValueList.props.content.should.eql(testData[i])
			keyValueList.type.displayName.should.eql('KeyValueList');
		}
	});
});
