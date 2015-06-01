'use strict';
/**
 * Filter updates Route.
 */
import React from 'react';
import { navigateAction, NavLink, handleRoute} from 'fluxible-router';
import connectToStores from 'fluxible/addons/connectToStores';
// import SearchStore from '../stores/SearchStore';

import cx from 'classnames';
import Search from './Search.js';
import mui from 'material-ui';
import _ from 'lodash';
let ThemeManager = require('material-ui/lib/styles/theme-manager')();
// let AppBar = mui.AppBar;
// let TextField = mui.TextField;
// let Toolbar = mui.Toolbar
// let ToolbarGroup = mui.ToolbarGroup
// let ToolbarSeparator = mui.ToolbarSeparator
// let RaisedButton = mui.RaisedButton
// let FontIcon = mui.FontIcon
// let ToolbarTitle = mui.ToolbarTitle
let Paper = mui.Paper
let DatePicker = mui.DatePicker
let Slider = mui.Slider
// let FlatButton = mui.FlatButton

//TODO:improve filter
class Filter extends React.Component {
    constructor() {
        super();
        this.filter = {
          maxPrice: 1000,
          checkinDate: '06-01-2015'
        }
    }
    // Important! for material UI
    getChildContext() { 
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    _updateAndRoute(key){
      const currentRoute = this.props.currentNavigate.url;
      this.context.executeAction(navigateAction, {
                method: 'GET',
                url: currentRoute +"&maxPrice=1000"
      });

      //let newRoute = 
      //looking for "&maxPrice=1000" or "&maxPrice=1000&"
      //if there is none, append "&maxPrice=1000"
      //else replace current maxPrice with the new value and execute route
    }

    _onPriceRangeChanged(e, value){
       console.log(value)
       this.maxPrice =  this.maxPrice * value;
       this._updateAndRoute('maxPrice')
    }
    render() {
        return (
             <div className="Filter">
              <span> Checkin Date: </span>
              <DatePicker hintText="Portrait Dialog" mode="landscape" className="filter-date"/>
              <span> Price: </span>
              <Slider name="slider1" defaultValue={0.5} onChange={_.debounce(this._onPriceRangeChanged.bind(this), 500)}/>

            </div>
        );
    }
}
 // Important! for material UI
Filter.childContextTypes = {
  muiTheme: React.PropTypes.object
};


Filter.contextTypes = {
    executeAction: React.PropTypes.func,
};

Filter.propTypes = {
    currentRoute: React.PropTypes.object
};

Filter = handleRoute(Filter);

module.exports = Filter;
