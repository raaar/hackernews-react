/** @jsx React.DOM */
var React 				= require('React');

var Navigation = React.createClass({

	openFavouritesPage: function (e){
		e.preventDefault();
		this.props.switchView('favourites')
	},

	openTopStoriesPage: function (e){
		e.preventDefault();
		this.props.switchView('topstories')
	},

	render: function() {



		return (
			<div>
			    <nav>
			      <ul>
			        <li>
			        	<a 	href="#" 
			        		className={this.props.currentTab === 'topstories' ? 'active' : null}
			        		onClick={this.openTopStoriesPage}>
			        			<i className=" icon-list-bullet"></i>
			        		</a>
			        </li>

			        <li>
			        	<a 	href="#"
			        		className={this.props.currentTab === 'favourites' ? 'active' : null}
			        		onClick={this.openFavouritesPage}>
			        			<i className="icon-heart"></i>
			        		</a>
			        </li>
			      </ul>
			    </nav>
			</div>
		);
	}
});

module.exports = Navigation;

