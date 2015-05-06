/** @jsx React.DOM */
var React 				= require('React'),
	_			  		= require('lodash'),
	Firebase 	  		= require('firebase'),
	List 				= require('./List'),
	Navigation			= require('./Navigation');


var Content = React.createClass({
	render: function(){
		return(
			<div>

 			{this.props.currentTab === 'topstories' ?
                <div className="mike">
                	<h1>top Stories</h1>
                    <img src="http://s.mlkshk.com/r/104TN" />
                </div>
                :null
            }

 			{this.props.currentTab === 'favourites' ?
                <div className="mike">
                	<h1>top Stories</h1>
                    <img src="http://s.mlkshk.com/r/104TN" />
                </div>
                :null
            }


			</div>
			)
	}
})

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
			favourites: [],
			currentTab: 'topstories'
		}
	},

	switchTab: function(pageName) {
		this.setState({
			currentTab: pageName
		})
	},

	render: function() {

		return (
			<div>

				<div className="list container">
					<button onClick={this.clearStoreage}>Clear storage</button>

		 			{this.state.currentTab === 'topstories' ?
							<List  	stories={this.state.stories}  
								topIds={this.state.topIds}
								addFavourite={this.addFavourite}/>	
		                :null
		            }

		 			{this.state.currentTab === 'favourites' ?
							<List  	stories={this.state.favourites}  
								topIds={this.state.topIds}
								addFavourite={this.addFavourite}/>	
		                :null
		            }

		        </div>

				<Navigation switchView={this.switchTab} currentTab={this.state.currentTab}/>

			</div>
		);
	}
});

module.exports = App;