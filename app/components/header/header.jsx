var
	React = require('react'),
	ReactRouter = require('react-router'),
	Link = ReactRouter.Link;

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
								<li><Link to="/test">Test Link</Link></li>
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
