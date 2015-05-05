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
					stories: stories,
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

	clearStoreage: function(e) {
		localStorage.clear();
		console.log('STORAGE CLEARED');
	},

	addFavourite: function(item) {

		var foo = []
		var oldFavourites = this.state.favourites;
		oldFavourites.push(item);

		var newFavourites = _.uniq(oldFavourites, 'title');

		this.setState({
			favourites: newFavourites
		})

		localStorage.setItem('favouritesStorage', JSON.stringify(newFavourites))
	},

	componentDidMount: function() {
		this.loadData();

		var loadSavedData = JSON.parse(localStorage.favouritesStorage);
		this.setState({
			favourites: loadSavedData
		})
	},

	getInitialState: function() {
		return { 
			stories: [],
			topIds: [],
			favourites: []
		}
	},

	render: function() {
		return (
			<div>

				<button onClick={this.clearStoreage}>Clear storage</button>
				<div className="list container">
					
					<List  	stories={this.state.stories}  
							topIds={this.state.topIds}
							addFavourite={this.addFavourite}/>	

							<hr/>

					<List  	stories={this.state.favourites}  
						topIds={this.state.topIds}
						addFavourite={this.addFavourite}/>		
										
				</div>
			</div>
		);
	}
});

module.exports = App;