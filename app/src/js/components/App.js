/** @jsx React.DOM */
var React 				= require('React'),
	_			  		= require('lodash'),
	Firebase 	  		= require('firebase'),
	List 				= require('./List'),
	Navigation			= require('./Navigation');


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

			topIds = _.take(items, 35);

			this.setState({
				topIds: topIds
			})

			this.loadStory(topIds);

		}.bind(this))

	},

	switchTab: function(pageName) {
		this.setState({
			currentTab: pageName
		})
	},

	addFavourite: function(item) {
		var oldFavourites = this.state.favourites;
		oldFavourites.push(item);

		var newFavourites = _.uniq(oldFavourites, 'title');

		this.setState({
			favourites: newFavourites
		})

		localStorage.setItem('favouritesStorage', JSON.stringify(newFavourites))
	},

	removeFavourite: function(item) {
		console.log(item)
		var arrayFavourites = this.state.favourites;
		var newFavourites = _.remove(arrayFavourites, item)

		this.setState({
			favourites: arrayFavourites
		})

		localStorage.setItem('favouritesStorage', JSON.stringify(arrayFavourites))		
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
			favourites: [],
			currentTab: 'topstories'
		}
	},

	render: function() {

		return (
			<div>
				<div className="list container">

		 			{this.state.currentTab === 'topstories' ?
							<List  	stories={this.state.stories}  
								topIds={this.state.topIds}
								currentTab={this.state.currentTab}
								addFavourite={this.addFavourite}
								removeFavourite={this.removeFavourite}/>	
		                :null
		            }

		 			{this.state.currentTab === 'favourites' ?
							<List  	stories={this.state.favourites}  
								topIds={this.state.topIds}
								currentTab={this.state.currentTab}
								addFavourite={this.addFavourite}
								removeFavourite={this.removeFavourite}/>	
		                :null
		            }

		        </div>
				<Navigation switchView={this.switchTab} currentTab={this.state.currentTab}/>
			</div>
		);
	}
});

module.exports = App;