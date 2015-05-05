/** @jsx React.DOM */
var React 				= require('React'),
	ListItem 			= require('./ListItem');


var List = React.createClass({
	render: function() {

		var storyItem = this.props.stories.map(function (item) {
			return <ListItem 
					title={item.title}
					url={item.url}
					addFavourite={this.props.addFavourite}/>
		}.bind(this))

		return (
			<div>
				<ul>
					{storyItem}
				</ul>
			</div>
		);
	}
});

module.exports = List;
