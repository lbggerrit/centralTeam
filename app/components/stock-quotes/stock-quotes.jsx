var React = require('react'),
	$ = require('../../assets/js/vendor/jquery.custom');

var StockQuotes = React.createClass({
	componentDidMount: function() {

	},
	getDataEvent: function(e) {
		e.preventDefault();
		this.getData();
	},
	getData: function() {
		var self = this;
		$.ajax({
			url: '/api/get-quote',
			success: function(data) {
				self.setState({...data.StockQuotes.Stock[0]});

			}
		});
	},
	getRenderedData: function() {
		var
			key,
			render = [];
		for ( key in this.state ) {
			render.push(<li><strong>{key}:</strong> {this.state[key][0]}</li>)
		}
		return render;
	},
	render: function() {
		return (
			<div className="stock-quotes">
				<a href="#" className="btn btn-primary" onClick={this.getDataEvent}>Get data from remote wsdl</a>
				<ul className="data-list">
					{this.getRenderedData()}
				</ul>
			</div>
		);
	}
});

module.exports = StockQuotes;
