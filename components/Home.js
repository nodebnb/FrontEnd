/** MyAwesomeReactComponent.jsx */

var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;
var ThemeManager = require('material-ui/lib/styles/theme-manager')();

var SomeAwesomeComponent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        console.log('setting context!!');
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    render: function() {
        return ( 
            <div className="homeMain">
              <img className="homeImg" src="https://www.joshuacripps.com/blog/wp-content/uploads/2012/08/upper-yosemite-falls-half-dome-yosemite-national-park-large.jpg"/>
            </div> );
    }

});

module.exports = SomeAwesomeComponent;