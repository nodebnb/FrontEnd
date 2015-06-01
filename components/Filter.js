'use strict';
import React from 'react';
import { navigateAction, NavLink } from 'fluxible-router';
import cx from 'classnames';
import Search from './Search.js';
import mui from 'material-ui';
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


class Filter extends React.Component {
    constructor() {
        super();
    }
    // Important! for material UI
    getChildContext() { 
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    render() {
        return (
             <div className="Filter">
              <span> Price: </span>
              <Slider name="slider1" />
              <span> Checkin Date: </span>
              <DatePicker hintText="Portrait Dialog" mode="landscape"/>
            </div>
        );
    } 
}
 // Important! for material UI
Filter.childContextTypes = {
  muiTheme: React.PropTypes.object
};
Filter.propTypes = {
    currentRoute: React.PropTypes.object,
    selected: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string
};

Filter.defaultProps = {
    selected: 'home',
    links: {}
};

module.exports = Filter;
