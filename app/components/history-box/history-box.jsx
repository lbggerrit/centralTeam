var React = require('react'),
	Snippets = require('../_snippets/index.jsx');

var HistoryBox = React.createClass({
	getInitialState: function() {
		return {
			maxHistory: 3,
			maxKeys: 2,
			ids: []
		};
	},
	getDefaultProps: function() {
		return {
			data: [],
			title: 'History'
		};
	},
	renderHistory: function() {

		var idLen = Math.min(this.props.ids.length, this.props.maxHistory),
			content,
			renderOutput = [],
			i;

		if (!idLen) {
			return (
				<div>No active history</div>
			);
		}

		for (i = 0; i < idLen; ++i) {
			content = this.props.data[this.props.ids[i]];
			renderOutput.push(
				<li key={i}>
					<Snippets.KeyValueList content={content} hideId={false} maxKeys={this.props.maxKeys} />
				</li>
			);
		}
		return renderOutput;
	},
	render: function() {
		return (
			<div className="history-box">
				<div className="header">{this.props.title}</div>
				<ul>{this.renderHistory()}</ul>
			</div>
		);
	}
});

module.exports = HistoryBox;
