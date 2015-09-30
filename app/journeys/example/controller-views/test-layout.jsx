var
	React = require('react'),
	Header = require('../../../components/header/header.jsx'),
	FluxForm = require('../../../flux/FluxForm.jsx'),
	FluxSubmit = FluxForm.FluxSubmit,
	FluxFormProperty = FluxForm.FluxFormProperty;

var TestLayoutController = React.createClass({

	render: function() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						Test Redirect Example
						<FluxForm storeName="tableStore" action="SET_LIMIT" redirect="/">
							<FluxFormProperty propertyName="limit" propertyValue="5"/>
							<FluxSubmit>Set table limit to 5</FluxSubmit>
						</FluxForm>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = TestLayoutController;
