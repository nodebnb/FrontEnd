'use strict';
import React from 'react';
// import { NavLink } from 'fluxible-router';
import doSearch from '../actions/doSearch';
import SearchStore from '../stores/SearchStore';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleRoute } from 'fluxible-router';
import mui from 'material-ui';
let ThemeManager = require('material-ui/lib/styles/theme-manager')();
let RaisedButton = mui.RaisedButton

import Map from './Map';
import Filter from './Filter';

class SearchResults extends React.Component {
	 constructor(props, context) {
        super(props, context);
        this.state = {
            isMenuVisible: false
        };
    }

    queryChanged(e){
    	this.context.executeAction(doSearch, {'id':  e.target.value})
    }

    componentDidUpdate() {
        // console.log("><this.props.currentRoute", this.props)
        //this handles performing a search when deep linking to search page
        // const query = this.props.currentRoute.get('query').get('q')
        // console.log(">< query", query)
        // // hancky here
        // const storeQuery = this.context.getStore(SearchStore).getQuery();
        // console.log(">< storeQuery", storeQuery)
        // if (query && query !== storeQuery) {
        //   this.context.executeAction(doSearch, query);
        // }
    }

    showResults() {
        let html = (<p>No results found</p>)
        let searchResults = this.props.search.results;
        const results = searchResults.map(result => {
            return (
                <li className="listingOneContainer" key={result.id}>
                    <img className="listingImg" src='https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg'/>
                    <h3>
                        {result.title}
                    </h3>
                    <div>
                       <span>Location: </span>
                       {result.location}
                    </div>
                </li>
            );
        });

        if (results.length) {
            html = (<ul className="ListingContainer">{results}</ul>);
        }

        return html;
    }

    render() {
        return (
            <div id="main" role="main" class="SearchResultCmp">
                <div className="SearchResult-Search"> 
                <Filter/>
                {this.showResults()}
                </div>
                <div className="SearchResult-Map"><Map/></div>
            </div>
        );
    }
}



SearchResults.contextTypes = {
    executeAction: React.PropTypes.func,
    getStore: React.PropTypes.func
};

SearchResults.propTypes = {
    currentRoute: React.PropTypes.object.isRequired,
    results: React.PropTypes.array
};

SearchResults = connectToStores(SearchResults, [ SearchStore ], function (stores, props) {
    return {
        search: stores.SearchStore.getState()
    };
});
SearchResults = handleRoute(SearchResults);

// SearchResults = provideContext(SearchResults)

export default SearchResults;