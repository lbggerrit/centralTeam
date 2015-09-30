var
	React = require('react'),
	FluxForm = require('../../flux/FluxForm.jsx'),
	FluxNoJs = FluxForm.FluxNoJs,
	FluxSubmit = FluxForm.FluxSubmit,
	FluxFormProperty = FluxForm.FluxFormProperty,
	Controls = require('./table-controls.jsx'),
	$ = require('../../assets/js/vendor/jquery.custom.js');

var Table = React.createClass({
	getDefaultProps: function() {
		return {
			limit: 0
		};
	},
	componentDidMount: function() {
		var self = this;
		$(React.findDOMNode(this))
			.on('click', 'tbody tr', function() {
				self.props.clickRowItem(this.dataset.key);
			});
	},
	getTableRows: function(data) {
		var l = data.length,
			rows = [],
			limit = parseInt(this.props.limit, 10),
			i;
		for (i = 0; i < l; i++) {
			rows.push(
				<tr data-key={i} key={i} className={this.props.currentKey === i ? 'active' : ''}>
					{this.getTableRow(data[i])}
					<FluxNoJs>
						<td>
							<FluxForm storeName={this.props.storeName} action={this.props.setCurrentKeyAction}>
								<FluxFormProperty propertyName="currentKey" propertyValue={i} />
								<FluxSubmit>View</FluxSubmit>
							</FluxForm>
					</td>
				</FluxNoJs>
				</tr>
			);
			if ( i >= limit - 1 && limit !== 0 ) {
				break;
			}
		}

		return rows;
	},
	getTableRow: function(data) {
		var cells = [],
			key;

		for (key in data) {
			cells.push(
				<td key={key}>{data[key]}</td>
			);
		}

		return cells;
	},
	getTableHead: function(data) {
		var header = [],
			key;

		for (key in data) {
			header.push(<th key={key}>{key}</th>);
		}

		return header;
	},
	render: function() {
		return (
			<div className="data-table">
				<Controls
					limit={this.props.limit}
					total={this.props.data.length}
					storeName={this.props.storeName}
					setLimitAction={this.props.setLimitAction} />
				<table className={'table ' + this.props.className}>
					<thead>
						<tr>
							{this.getTableHead( this.props.data[0] )}
							<FluxNoJs>
								<th>Details</th>
							</FluxNoJs>
						</tr>
					</thead>
					<tbody>
						{this.getTableRows(this.props.data)}
					</tbody>
				</table>
				<Controls
					limit={this.props.limit}
					total={this.props.data.length}
					storeName={this.props.storeName}
					setLimitAction={this.props.setLimitAction} />
			</div>
		);
	}
});

module.exports = Table;
