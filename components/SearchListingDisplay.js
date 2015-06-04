/** MyAwesomeReactComponent.jsx */

var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Paper = mui.Paper,
    Dialog = mui.Dialog,
    FlatButton = mui.FlatButton,
    TextField = mui.TextField,
    FontIcon = mui.FontIcon;


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
    _handleCustomDialogSubmit: function(){
        console.log("booked")
    },
    handleStandardDialogTouchTap: function(){
         this.refs.standardDialog.show();
    },

    render: function() {
        let html = (<p>No results found</p>)
        let searchResults = this.props.results;
          var standardActions = [
          { text: 'Cancel' },
          { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
        ];

        const results = searchResults.map(result => {
            return (
                <li className="listingOneContainer" key={result.id}>

                    <div class="listingImageContainer">
                       <Paper>
                         <img className="listingImg" src={result._source.image}/>
                       </Paper>
                       <Paper className="priceTag" style={{backgroundColor:'black'}}>
                               <span>$ </span>
                               {result._source.price}
                        </Paper>
                         <FlatButton 
                           className="Book" 
                           label="Book" 
                           primary={true}
                           onTouchTap={this.handleStandardDialogTouchTap.bind(this)} 
                           style={{float:'right'}}
                           />
                    </div>
                    <h3>
                        {result._source.name}
                    </h3>
                    <div>
                       <span>Location: </span>
                       ({result._source.lat}, {result._source.lng})
                    </div>
                       <Dialog
                          ref="standardDialog"
                          title="Book"
                          actions={standardActions}
                          actionFocus="submit"
                          modal={true}>
                           <h2>Book {result._source.name} </h2>
                           <div>Price:{result._source.price}</div>
                           <div>
                           Your Email:
                           <TextField hintText="Email Address" />
                           </div>
                        </Dialog>

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