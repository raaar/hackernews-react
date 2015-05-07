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
		/* 
			The swipe event passes the title of the item
			we wish to remove.
		*/
		console.log(this.props.title)
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

                  //link.setAttribute("class", "link hide");

                  hammer.on('panstart', function() {
                      item.style[transitionStyle] = 'none';
                  });

    	hammer.on("panleft panright", function(event){
            moveX = startX + event.deltaX;
            friction = startX > min ? min/1.5 : startX;

            if (moveX < min) {
                friction = startX > min ? min/1.5 : startX;
                moveX = friction + (event.deltaX/1.3);
            }                          

            item.style[transformStyle] = 'translateX(' + moveX + 'px)';

            console.log(event.target.clientWidth)
            if( Math.floor((event.distance / event.target.clientWidth) * 100) > 80 ) {
             
            	if(scope.props.currentTab === 'topstories' ){
            		scope.save();
              		item.setAttribute("class", "item-inner saved")
            	} else if (scope.props.currentTab === 'favourites'){
            		hammer.off("panleft panright")
            		scope.remove()
              		//item.setAttribute("class", "item-inner removed")
              		resetSwipe(event)
            	}


            }
      	});

      	hammer.on('panend', function(e) {                    
			resetSwipe(e)
      	});


        function resetSwipe(e) {
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
        }

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
				<li className={this.props.currentTab}>

    				<div ref="test" className="item-inner" onTouchStart={this.detect}>
    					<h3>{this.props.title}</h3>
    					<a ref="itemLink" href={this.props.url} target="_blank" ></a> 
    				</div>
					

				</li>
		);
	}
});

module.exports = ListItem;
