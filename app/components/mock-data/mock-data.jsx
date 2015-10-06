var React = require('react'),
	$ = require('../../assets/js/vendor/jquery.custom');

var MockData = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {

	},
	getDataEvent: function(e) {
		e.preventDefault();
		this.getData();
	},
	getData: function() {
		var self = this;
		$.ajax({
			url: this.props.dataUrl,
			success: function(data) {
				self.setState({
					data: data.response.involvedParty.account
				});
			}
		});
	},
	getRenderedData: function() {
		var
			key,
			render = [],
			data = this.state.data;

		console.log( data );

		data.map(function(item) {
			for ( key in item) {
				render.push(<li><strong>{key}:</strong> {item[key]}</li>);
			}
		});
		return render;
	},
	render: function() {
		return (
			<div className="mock-data">
				<a href="#" className="btn btn-primary" onClick={this.getDataEvent}>{this.props.buttonTitle}</a>
				<ul className="data-list">
					{this.getRenderedData()}
				</ul>
			</div>
		);
	}
});

module.exports = MockData;
