/** @jsx React.DOM */
var React 				= require('React'),
	_			  		= require('lodash'),
	Firebase 	  		= require('firebase'),
	List 				= require('./List');


var App = React.createClass({

	loadStory: function(ids){
		var newsItem = 'https://hacker-news.firebaseio.com/v0/item/',
			scope = this,	
		 	stories = [];

		ids.forEach(function (id){
			var currentItem = new Firebase (newsItem + id);
			currentItem.once('value', function(snap){
				stories.push(snap.val());

				scope.setState({
					stories: stories
				})
			})
		})
	},

	loadData: function() {
		var fb ='https://hacker-news.firebaseio.com/v0/';
		var topstories =  new Firebase( fb + 'topstories');
		
		topstories.on('value', function (snap){
			var items = [];
			var topIds = [];

			snap.forEach(function (itemSnap){
				items.push(itemSnap.val());
			})

			topIds = _.take(items, 10);


			this.setState({
				topIds: topIds
			})

			this.loadStory(topIds);

		}.bind(this))

	},

	componentDidMount: function() {
		this.loadData();
	},

	getInitialState: function() {
		return { 
			stories: [],
			topIds: []
		}
	},

	render: function() {
		return (
			<div>
				<div className="list container">
					
					<List  stories={this.state.stories}  topIds={this.state.topIds}/>					

				</div>
			</div>
		);
	}
});

module.exports = App;