import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class Layout extends Component {
    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (
            <Grid fullWidth md={12} container noWrap className="landingPageImage">
                {this.props.children}
            </Grid>
        );
    }
}

export default Layout;