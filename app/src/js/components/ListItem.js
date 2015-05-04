/** @jsx React.DOM */
var React 				= require('React');

var ListItem = React.createClass({


	render: function() {

		return (
			<div>
				<li>
					<a href={this.props.url} target="_blank">
						{this.props.title}
					</a>
				</li>
			</div>
		);
	}
});

module.exports = ListItem;