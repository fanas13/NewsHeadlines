import React, { Component } from 'react';

import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core';
import { NotificationsNone } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

class LeftNav extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {};
    }

    render() {
        return (
            <div className="grow">
                <AppBar position="static">
                    <Toolbar className="toolbarContainer">
                        <Typography className="title route" variant="h6" noWrap>ROUTE</Typography>&nbsp;<Typography className="title slip" variant="h6" noWrap> SLIP</Typography>
                        <div className="grow" />
                        <div>
                            <IconButton aria-label="show 0 new notifications" color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <NotificationsNone className="topIconsCopy" />
                                </Badge>
                            </IconButton>
                            <IconButton onClick={this.props.toggleDrawer} edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" color="inherit" style={{ marginLeft: '30px' }}>
                                <MenuIcon className="topIconsCopy" />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const menuId = 'primary-search-account-menu';

export default LeftNav;