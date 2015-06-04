'use strict';
/**
 * Filter updates Route by executing navigate action
 */
import React from 'react';
import { navigateAction, NavLink, handleRoute} from 'fluxible-router';
import connectToStores from 'fluxible/addons/connectToStores';
// import SearchStore from '../stores/SearchStore';

import cx from 'classnames';
// import Search from './Search';
import mui from 'material-ui';
import _ from 'lodash';
import UrlUtil from '../utils/UrlUtil';
let ThemeManager = require('material-ui/lib/styles/theme-manager')();
let DatePicker = mui.DatePicker;
let Slider = mui.Slider;
import doSearch from '../actions/doSearch';

//TODO:improve filter
class Filter extends React.Component {
    constructor() {
        super();
        this.filter = {
            maxPrice: 1000,
            checkinDate: '06-01-2015'
        };
    }
    // Important! for material UI
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    //as soon as a property changed, trigger a routing change
    //this is only handling one query changes
    _updateAndRoute(key) {
        let newUrl = this.props.currentNavigate.url;
        const query = this.props.currentRoute.get('query').get(key);
        if (query) {
            newUrl = UrlUtil.updateQuery(newUrl, key, this.filter[key]);
        } else {
            newUrl = UrlUtil.addQuery(newUrl, key, this.filter[key]);
        }
        console.log(">< newUrl", newUrl)

        //TODO: compare if query changed in searchstore before executeAction
        this.context.executeAction(navigateAction, {
            method: 'GET',
            url: newUrl
        });

        //let newRoute =
        //looking for "&maxPrice=1000" or "&maxPrice=1000&"
        //if there is none, append "&maxPrice=1000"
        //else replace current maxPrice with the new value and execute route
    }
    _onPriceRangeChanged(e, value) {
        console.log(value);
        this.filter.maxPrice = Math.floor(this.filter.maxPrice * value);
        this._updateAndRoute('maxPrice');
    }
    _onDateChange(e){
        console.log(">< date changed", e);
    }

    render() {
        return (
             <div className="Filter">
              <span> Checkin Date: </span>
              <DatePicker hintText="Portrait Dialog" mode="landscape" className="filter-date" onChange={this._onDateChange}/>
              <span> Price: </span>
              <Slider name="slider1" defaultValue={0.5} onChange={_.debounce(this._onPriceRangeChanged.bind(this), 200)}/>

            </div>
        );
    }
}
 // Important! for material UI
Filter.childContextTypes = {
  muiTheme: React.PropTypes.object
};


Filter.contextTypes = {
    executeAction: React.PropTypes.func
};

Filter.propTypes = {
    currentRoute: React.PropTypes.object
};

Filter = handleRoute(Filter);

module.exports = Filter;
