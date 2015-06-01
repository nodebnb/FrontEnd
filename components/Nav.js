'use strict';
import React from 'react';
import { navigateAction, NavLink } from 'fluxible-router';
import cx from 'classnames';
import Search from './Search.js';
import mui from 'material-ui';
let ThemeManager = require('material-ui/lib/styles/theme-manager')();
let AppBar = mui.AppBar;
let TextField = mui.TextField;
let Toolbar = mui.Toolbar
let ToolbarGroup = mui.ToolbarGroup
let ToolbarSeparator = mui.ToolbarSeparator
let RaisedButton = mui.RaisedButton
let FontIcon = mui.FontIcon
let ToolbarTitle = mui.ToolbarTitle
let Paper = mui.Paper
let FlatButton = mui.FlatButton


class Nav extends React.Component {
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
        const title = 'Node-bnb';
        // DO NOT DELETE
        // const selected = this.props.selected;
        const links = this.props.links;
        // const linkHTML = Object.keys(links).map(function (name) {
        //     var className = '';
        //     var link = links[name];
        //     if (selected === name) {
        //         className = 'pure-menu-selected';
        //     }
        //     return (
        //         <li className={className} key={link.path}>
        //             <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
        //         </li>
        //     );
        // });
        return (
              <Toolbar>
                  <ToolbarGroup key={1} float="left">
                    <NavLink className="mainTitle" routeName={links['home'].page}>{title}</NavLink>
                    <FontIcon className="muidocs-icon-action-home"/>
                    <Search currentRoute={this.props.currentRoute}/>
                  </ToolbarGroup>

                   <ToolbarGroup key={2} float="right">
                            <RaisedButton label="Signup" secondary={true}/>
                            <RaisedButton label="Login" secondary={true} />
                    </ToolbarGroup>
                </Toolbar>
        );
    } 
}
 // Important! for material UI
Nav.childContextTypes = {
  muiTheme: React.PropTypes.object
};
Nav.propTypes = {
    currentRoute: React.PropTypes.object,
    selected: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
};

Nav.defaultProps = {
    selected: 'home',
    links: {}
};

module.exports = Nav;
