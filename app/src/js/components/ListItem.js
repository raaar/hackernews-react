/** @jsx React.DOM */
var React 				= require('React');

var ListItem = React.createClass({

	save: function() {
		this.props.addFavourite({
			title: this.props.title,
			url: this.props.url
		})
	},

	remove: function() {
		this.props.removeFavourite({
			title: this.props.title
		});
	},

	render: function() {

		return (
				<li>
					<a href={this.props.url} target="_blank">
						{this.props.title}
					</a>
					
					{this.props.currentTab === 'topstories' 
					? 
					<button onClick={this.save}>Add</button>
					:
					<button onClick={this.remove}>Remove</button>					 
					}
				</li>
		);
	}
});

module.exports = ListItem;
