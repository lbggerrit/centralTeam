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
								<li><a href="/api/quote/aapl">Get Quote For AAPL</a></li>
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
