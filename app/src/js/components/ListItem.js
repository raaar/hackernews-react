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

	componentWillMount: function() {
		React.initializeTouchEvents(true)
	},

	detect: function(e) {
		var scope = this;
		var item = this.refs.test.getDOMNode()
		var link = this.refs.itemLink.getDOMNode()
		console.log(link)


		var  hammer = new Hammer(item, {dragLockToAxis: true, dragBlockHorizontal: true});

                  var   min = 0,
                        max = 0,
                        moveX = 0, 
                        startX = 0, 
                        added = 0, 
                        speed, 
                        friction = 0;

                  var  hammer = new Hammer(item, {dragLockToAxis: true, dragBlockHorizontal: true});

                  var transformStyle = prefix() + 'Transform';
                  var transitionStyle = prefix() + 'Transition';

                  hammer.on('panstart', function() {
                      item.style[transitionStyle] = 'none';
                       link.setAttribute("class", "link hide");
                  });

                  hammer.on("panleft panright", function(event){
                        moveX = startX + event.deltaX;
                        friction = startX > min ? min/1.5 : startX;

                        if (moveX < min) {
                            friction = startX > min ? min/1.5 : startX;
                            moveX = friction + (event.deltaX/1.3);
                        }                          

                        item.style[transformStyle] = 'translateX(' + moveX + 'px)';

                        if( Math.floor((event.distance / event.target.clientWidth) * 100) > 60 ) {
                          scope.save();

                          item.setAttribute("class", "item-inner saved")

                        }
                  });

                  hammer.on('panend', function(e) {

                   		link.setAttribute("class", "link");
                    
                      speed = .2 / (Math.abs(e.velocityX) + 1);

                      added += e.deltaX;

                      if (added < min/2) {
                          startX = min;
                      }
                      else if (added > Math.abs(min/2)) {
                          startX = max;
                      }

                      item.style[transitionStyle] = 'all ' + speed + 's ease-in-out';
                      item.style[transformStyle] = 'translateX(' + startX + 'px)';

                      added = 0;

                  });



        function prefix() {

            var styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1];

            return pre[0].toUpperCase() + pre.substr(1);

        }



	},

	render: function() {

		return (
				<li>

    				<div ref="test" className="item-inner" onTouchStart={this.detect}>
    					<h3>{this.props.title}</h3>
    					<a ref="itemLink" href={this.props.url} target="_blank" ></a> 
    				</div>
					
					{this.props.currentTab === 'topstories' 
					? 
					<button className="hide" onClick={this.save}>Add</button>
					:
					<button onClick={this.remove}>Remove</button>					 
					}
				</li>
		);
	}
});

module.exports = ListItem;
