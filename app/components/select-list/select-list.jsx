var React = require('react'),
	FluxForm = require('../../flux/FluxForm.jsx'),
	FluxNoJs = FluxForm.FluxNoJs,
	FluxSubmit = FluxForm.FluxSubmit;

var SelectList = React.createClass({
	getInitialState: function() {
		return {
			value: this.props.value
		};
	},
	getOptionsList: function() {
		return this.props.items.map((function(item) {
			return (
				<option
					key={item.value}
					value={item.value}
					>
					{item.title}
				</option>
			);
		}).bind(this));
	},
	whenChange: function(e) {
		var value = e.target.value;
		this.setState({value});
		this.props.whenChange(value);
	},
	render: function() {
		return (
			<div className="select-list">
				<select aria-label={this.props.name} name={this.props.name} id={this.props.id} onChange={this.whenChange} defaultValue={this.state.value}>
					{this.getOptionsList()}
				</select>
			</div>
		);
	}
});

module.exports = SelectList;
