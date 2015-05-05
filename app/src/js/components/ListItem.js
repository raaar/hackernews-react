/** @jsx React.DOM */
var React 				= require('React');

var ListItem = React.createClass({

	save: function() {
		this.props.addFavourite({
			title: this.props.title
		})
	},

	render: function() {

		return (
				<li>
					<a href={this.props.url} target="_blank">
						{this.props.title}
					</a>

					<button onClick={this.save} >Add</button>
				</li>
		);
	}
});

module.exports = ListItem;
