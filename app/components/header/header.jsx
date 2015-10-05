var
	React = require('react'),
	ReactRouter = require('react-router');
//Link = ReactRouter.Link;

// build

var Header = React.createClass({
	render: function() {
		return (
			<header className="header">
				<div className="container">
					<div className="row">
						<div className="col-md-4 logo-row is-empty">
						</div>
						<div className="col-md-8">
							<nav className="text-right">
								<ul className="inline-list">
									<li><a href="/api/quote/aapl" target="_new">Get quote for AAPL over public WSDL</a></li>
									<li><a href="/api/salsa/hello" target="_new">Hello from SALSA</a></li>
									<li><a href="/api/salsa/product-names" target="_new">Product names from SALSA</a></li>
									<li><a href="/api/salsa/product-names-mock" target="_new">Product names mocked from SALSA</a></li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</header>
		);
	}
});

module.exports = Header;
