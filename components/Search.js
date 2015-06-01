import React from 'react';
import cx from 'classnames';
import { navigateAction, RouteStore } from 'fluxible-router';
import connectToStores from 'fluxible/addons/connectToStores';
// import SearchStore from '../stores/SearchStore';

import mui from 'material-ui';

/**
 * Search updates Route by executing navigate action
 */


let ThemeManager = require('material-ui/lib/styles/theme-manager')();
let TextField = mui.TextField;

const ENTER_KEY_CODE = 13;

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }
    // Important! for material UI
    getChildContext() { 
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }


    componentDidMount() {
        // this.context.executeAction(loadIndex);
        // // if on search page with query, then set state
        // const query = this.props.currentRoute.get('query').get('q');
        // if (query) {
        //     this.setState({
        //         visible: true
        //     });
        // }
    }

    componentDidUpdate() {
        // const el = React.findDOMNode(this.refs.q);
        // // ensure input is focused
        // if (this.state.visible) {
        //     el.focus();
        // }
        // // set input to query if present
        // const query = this.context.getStore(SearchStore).getQuery();
        // if (query) {
        //     el.value = query;
        // }
    }

    _getPath() {
        return this.context.getStore(RouteStore).makePath('search');
    }

    _onKeyDown(event) {
        console.log(">< enter key down")
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            event.stopPropagation();
            console.log("><event.target.value", event.target.value)

            this.context.executeAction(navigateAction, {
                method: 'GET',
                url: this._getPath() + '?q=' + event.target.value
            });
        }
    }

    render() {
        console.log(">< render")

        return (
                      <input
                        className="mainSearchBox"
                        hintText="Search BNB"
                        onKeyDown={this._onKeyDown.bind(this)}
                        />
            );
    }
}

Search.contextTypes = {
    executeAction: React.PropTypes.func,
    getStore: React.PropTypes.func
};

Search.propTypes = {
    currentRoute: React.PropTypes.object
};
 // Important! for material UI
Search.childContextTypes = {
  muiTheme: React.PropTypes.object
};

// Search = connectToStores(Search, [ SearchStore ], function (stores, props) {
//     return {
//         search: stores.SearchStore.getState()
//     };
// });


export default Search;