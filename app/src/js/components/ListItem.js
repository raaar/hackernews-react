/** @jsx React.DOM */
var React 				= require('React');

var ListItem = React.createClass({

  editFavourites: function(e){
    var button = this.refs.saveDeleteButton.getDOMNode(),
        item = this.refs.test.getDOMNode();

    //button.setAttribute('class', 'button active');

    if(this.props.currentTab === "topstories") {
      this.save(); 
      item.setAttribute('class', 'item-inner saved');

    } else {
      this.remove();
      item.setAttribute('class', 'item-inner removed');
      //button.setAttribute('class', 'button');
    }
  },

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

	componentWillMount: function() {
		React.initializeTouchEvents(true)
	},

  componentDidMount: function() {
    var link = this.refs.itemLink.getDOMNode(),
        item = this.refs.test.getDOMNode();

    this.hammer = new Hammer.Manager(item, {dragLockToAxis: true, dragBlockHorizontal: true});
    this.hammer.add( new Hammer.Pan({ threshold: 50 }) );

    this.hammer.on('panleft', function(event){
      item.setAttribute("class", "item-inner expanded")
    });

    this.hammer.on('panright', function(event){
      item.setAttribute("class", "item-inner")
    });
  },

  compoentDidUnmount: function() {
    this.hammer.off('panleft panright')
  },

	render: function() {


    var url = this.props.url;
    var r = /:\/\/(.[^/]+)/;
    if( url ) {
      this.parsedURL = url.match(r)[1];      
    }

		return (
				<li className={this.props.currentTab}>

    				<div ref="test" className="item-inner">
    					<h3>{this.props.title}</h3>
              <p>{this.parsedURL}</p>

    					<a ref="itemLink" href={this.props.url} target="_blank" ></a> 
    				</div>
            
            <a ref="saveDeleteButton" className="button" onClick={this.editFavourites}></a>
					
				</li>
		);
	}
});

module.exports = ListItem;
