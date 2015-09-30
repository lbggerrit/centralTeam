var
	React = require('react'),
	fluxHelper = require('../../flux/helper.js'),
	FluxForm = require('../../flux/FluxForm.jsx'),
	FluxSubmit = FluxForm.FluxSubmit,
	FluxNoJs = FluxForm.FluxNoJs;

var TableControls = React.createClass({
	componentWillMount: function() {
		this.tableActions = fluxHelper('tableStore').actions;
	},
	getDefaultProps: function() {
		return {
			limit: 0,
			storeName: null,
			setLimitAction: null
		};
	},
	updateLimit: function(e) {
		e.preventDefault();
		fluxHelper(this.props.storeName).fireAction(this.props.setLimitAction)({
			limit: this.refs.limit.getDOMNode().value
		});
	},
	render: function() {
		return (
			<div className="table-controls">
				<FluxForm storeName={this.props.storeName} action={this.props.setLimitAction}>
					<span className="total">Displaying: {this.props.limit} of {this.props.total}</span>
					<input className="form-control" ref="limit" onChange={this.updateLimit} type="number" name="limit" value={this.props.limit}/>
					<FluxNoJs>
						<FluxSubmit className="btn btn-primary">go</FluxSubmit>
					</FluxNoJs>
				</FluxForm>
			</div>
		);
	}
});

module.exports = TableControls;
