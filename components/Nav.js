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
let FlatButton = mui.FlatButton;
let Dialog = mui.Dialog;

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
    _handleSingup(){
           this.refs.signupDialog.show();
    }

    render() {
        const title = 'Node-bnb';
        // DO NOT DELETE
        // const selected = this.props.selected;
        const links = this.props.links;
        let standardActions = [
          { text: 'Cancel' },
          { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
        ];
        return (
            <div>
              <Toolbar>
                  <ToolbarGroup key={1} float="left">
                    <NavLink className="mainTitle" routeName={links['home'].page}>{title}</NavLink>
                    <FontIcon className="muidocs-icon-action-home"/>
                    <Search currentRoute={this.props.currentRoute}/>
                  </ToolbarGroup>

                   <ToolbarGroup key={2} float="right">
                        <RaisedButton 
                           className="Signup" 
                           label="Signup" 
                           secondary={true}
                           onTouchTap={this._handleSingup.bind(this)} 
                           style={{float:'right'}}
                           />

                         <RaisedButton  label="Login" secondary={true}  style={{float:'right'}}/>
                    
                    </ToolbarGroup>
                </Toolbar>
                 <Dialog
                          ref="signupDialog"
                          title="Signup"
                          actions={standardActions}
                          actionFocus="submit"
                          modal={true}>
                          <div>
                            <RaisedButton  label="Signup With Facebook" primary={true} rippleColor={'#3A5795'}/>
                            <RaisedButton  label="Signup With Twitter" secondary={true}/>
                          </div>
                          <div>
                              Your Email:
                               <TextField hintText="Email Address" />
                          </div>
                          <div>
                              Your Password:
                               <TextField hintText="Password" />
                           </div>
                        </Dialog>
                </div>
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
