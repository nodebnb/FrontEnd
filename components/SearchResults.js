'use strict';
import React from 'react';
// import { NavLink } from 'fluxible-router';
import doSearch from '../actions/doSearch';
import SearchStore from '../stores/SearchStore';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleRoute } from 'fluxible-router';
import ListingDisplay from './SearchListingDisplay';
import _ from 'lodash';
import mui from 'material-ui';
let ThemeManager = require('material-ui/lib/styles/theme-manager')();
let RaisedButton = mui.RaisedButton;

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
        const url = this.props.currentRoute.get('url')
        const query = this.props.currentRoute.get('query').get('q')
        console.log(">< routequery", query)
        // // hancky here
        const storeQuery = this.context.getStore(SearchStore).getQuery();
        const storeUrl = this.context.getStore(SearchStore).getUrl();
        console.log(">< storeQuery", storeQuery)
        if (url !== storeUrl) {
          let input = {url: url, query: query}
          this.context.executeAction(doSearch, input);
        }
    }

    getPositions() {
        let searchResults = this.props.search.results;
        if (!searchResults || searchResults.length == 0) {
            return {
                positions: [],
                center: {
                    lat: 37.4130690866137,
                    lng: -122.13531630593117
                }
            }
        }

        // console.log(">< searchResults", searchResults)
        // //we need a object list like this
        // //TODO: place the logic on server side probably
        let totalLat = 0;
        let totalLng = 0;
        let positions = [];
        for (let i of searchResults) {
            let latI = i._source.lat;
            let lngI = i._source.lng;
            totalLat += latI;
            totalLng += lngI;
            positions.push({
                position: {
                    lat: latI,
                    lng: lngI
                }
            });
        }
        return {
            positions: positions,
            center: {
                lat: totalLat / searchResults.length,
                lng: totalLng / searchResults.length
            }
        };

    }

    render() {
        let markers = this.getPositions()
        return (
            <div id="main" role="main" class="SearchResultCmp">
                <div className="SearchResult-Search"> 
                <Filter/>
                <ListingDisplay results={this.props.search.results}/>
                </div>
                <div className="SearchResult-Map"><Map positions={markers.positions} center={markers.center}/></div>
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