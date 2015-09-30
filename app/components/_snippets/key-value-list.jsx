var React = require('react'),
	textTransforms = require('../../utils/textTransforms.js');

var KeyValueList = React.createClass({
	getDefaultProps: function() {
		return {
			content: {},
			maxKeys: Infinity,
			hideId: true
		};
	},
	renderKeys: function() {

		var renderOutput = [],
			contentKeys,
			key,
			i,
			len;

		if (!this.props.content) {
			return;
		}

		contentKeys = Object.keys(this.props.content);

		// if there's an id key remove it as we don't want to render it
		if (this.props.hideId) {
			contentKeys.splice(contentKeys.indexOf('id'), 1);
		}

		if (!contentKeys.length) {
			return;
		}

		for (i = 0, len = Math.min(this.props.maxKeys, contentKeys.length); i < len; ++i) {
			key = contentKeys[i];
			renderOutput.push(
				<div key={i}>
					<span className="key">
						{textTransforms.prettyText(key)}
					</span>
					<span className="value">{this.props.content[key]}</span>
				</div>
			);
		}
		return renderOutput;
	},
	render: function() {
		return (<div className="key-value-list">{this.renderKeys()}</div>);
	}
});

module.exports = KeyValueList;
