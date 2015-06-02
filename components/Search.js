'use strict';
/**
 * Search and Filter will both access the route
 * route will update the search store
 */
import React from 'react';
import cx from 'classnames';
import { navigateAction, RouteStore, handleRoute} from 'fluxible-router';
import connectToStores from 'fluxible/addons/connectToStores';

// import SearchStore from '../stores/SearchStore';


import UrlUtil from '../utils/UrlUtil';

/**
 * Search updates Route by executing navigate action
 */

// import mui from 'material-ui';
// let ThemeManager = require('material-ui/lib/styles/theme-manager')();
// let TextField = mui.TextField;

const ENTER_KEY_CODE = 13;

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }
    // Important! for material UI
    // getChildContext() {
    //     return {
    //       muiTheme: ThemeManager.getCurrentTheme()
    //     };
    // }


    componentDidMount() {
        //do not delete
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
        //do not delete

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

    //TODO: find a more elegant way for generating the new url
    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            event.stopPropagation();
            let key = 'q';
            let value = event.target.value;
                //detect if current route is search or not
            let newUrl = this.props.currentNavigate.url;
            //if not on search page, redirect to search page
            if (newUrl.indexOf('search') < 0) {
                newUrl = this.context.getStore(RouteStore).makePath('search');
            }
            const query = this.props.currentRoute.get('query').get(key);
            if (query) {
                newUrl = UrlUtil.updateQuery(newUrl, key, value);
            } else {
                newUrl = UrlUtil.addQuery(newUrl, key, value);
            }

            this.context.executeAction(navigateAction, {
                method: 'GET',
                url: newUrl
            });
        }
    }
    render() {
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
// Search.childContextTypes = {
//   muiTheme: React.PropTypes.object
// };

// Search = connectToStores(Search, [ SearchStore ], function (stores, props) {
//     return {
//         search: stores.SearchStore.getState()
//     };
// });

Search = handleRoute(Search);

export default Search;
