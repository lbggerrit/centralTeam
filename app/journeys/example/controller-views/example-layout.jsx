var React = require('react'),
	InfoBox = require('../../../components/info-box/info-box.jsx'),
	HistoryBox = require('../../../components/history-box/history-box.jsx'),
	Table = require('../../../components/table/table.jsx'),
	SelectList = require('../../../components/select-list/select-list.jsx'),
	Header = require('../../../components/header/header.jsx'),
	fluxHelper = require('../../../flux/helper.js'),
	StockQuotes = require('../../../components/stock-quotes/stock-quotes.jsx');

var App = React.createClass({
	getInitialState: function() {
		var state;

		this.tableStore = fluxHelper('tableStore');
		//fire the table get data action on initial state for isomorphic purposes
		this.switchData(this.tableStore.getState().dataName);

		state = {
			...this.tableStore.getState(),
			selectItems: [
				{
					title: 'data source 1',
					value: 'table-dummy'
				},
				{
					title: 'data source 2',
					value: 'table-dummy-2'
				}
			]
		};
		state.content = state.data[state.currentKey];
		return state;
	},
	componentWillUnmount: function() {
		this.dataListener();
	},
	componentWillMount: function() {
		//state listener will only bind if client side to
		//stop react from trying to rerender server side
		this.dataListener = this.tableStore.addListener(this.updateData);
	},
	updateData: function() {
		this.setState(this.tableStore.getState());
	},
	clickRowItem: function(itemKey) {
		this.tableStore.fireAction('SET_CURRENT_KEY')({currentKey: itemKey});
	},
	switchData: function(url) {
		this.tableStore.fireAction('GET_DATA')({dataName: url});
	},
	render: function() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<StockQuotes />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = App;
