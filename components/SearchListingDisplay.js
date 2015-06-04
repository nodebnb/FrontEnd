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
        let html = (<p>No results found</p>)
        let searchResults = this.props.results;
        const results = searchResults.map(result => {
            return (
                <li className="listingOneContainer" key={result.id}>
                    <div class="listingImageContainer">
                       <img className="listingImg" src={result._source.image}/>
                        <div className="priceTag">
                           <span>$ </span>
                           {result._source.price}
                        </div>
                    </div>
                    <h3>
                        {result._source.name}
                    </h3>
                    <div>
                       <span>Location: </span>
                       ({result._source.lat}, {result._source.lng})
                    </div>
                </li>
            );
        });

        if (results.length) {
            html = (<ul className="ListingContainer">{results}</ul>);
        }

        return html;
    }

});

module.exports = SomeAwesomeComponent;