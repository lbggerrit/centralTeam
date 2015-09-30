var React = require('react'),
	Snippets = require('../_snippets/index.jsx');

var InfoBox = React.createClass({
	getDefaultProps: function() {
		return {
			content: {hello: 'world'},
			maxKeys: 3,
			hideId: true
		};
	},
	render: function() {
		return (
			<div className="info-box">
				<div className="header">{this.props.title}</div>
				<Snippets.KeyValueList {...this.props} />
			</div>
		);
	}
});

module.exports = InfoBox;
