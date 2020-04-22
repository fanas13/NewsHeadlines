import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, IconButton, InputBase, Divider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

import Article from './Article';
import Toast from './Toast';
import { newsActionCreators } from '../actions/api_actions/news';

import _ from 'lodash';
import moment from 'moment';

class Home extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            isLoaderActive: true,
            variant: '',
            toastOpen: false,
            message: '',
            articleText: 'q',
            selectedDate: moment(new Date()).format('YYYY-MM-DD'),
            sortBy: 'publishedAt'
        };
    }

    componentDidMount() {
        this.props.articleActions.getAllNewsHeadlines({ date: this.state.selectedDate, sortBy: this.state.sortBy, filterText: this.state.articleText }).then((data) => {
            this.setState({ isLoaderActive: false, variant: "success", message: 'Articles loaded succesfully!', toastOpen: true });
        }, (error) => {
            this.setState({ isLoaderActive: false, variant: "error", message: error.payload.message.message, toastOpen: true });
        });
    }

    handleToastClick = () => {
        this.setState({ toastOpen: !this.state.toastOpen });
    }

    renderLoader = (active) => {
        if (active) return <div className="loaderContainer"> <div className="pageContainerLoader"> <Loader type="TailSpin" color="#97b03a" height="100" width="100" /> </div> </div>;
    }

    handleArticleTextChange(e) {
        if (!_.isEmpty(e.target.value)) 
            this.setState({ articleText: e.target.value });
        else
            this.setState({ articleText: 'q' });
    }

    handleSortByChange(e) {
        this.setState({ sortBy: e.target.value });
    }

    searchArticles = () => {
        this.props.articleActions.getAllNewsHeadlines({ date: this.state.selectedDate, sortBy: this.state.sortBy, filterText: this.state.articleText }).then((data) => {
            this.setState({ isLoaderActive: false, variant: "success", message: 'Articles loaded succesfully!', toastOpen: true });
        }, (error) => {
            this.setState({ isLoaderActive: false, variant: "error", message: error.payload.message.message, toastOpen: true });
        });
    }

    handleDateChange(value) {
        const filterDate = moment(value).format('YYYY-MM-DD');
        this.setState({ selectedDate: filterDate });
    }

    render() {
        const classes = this.props.classes;
        return (
            <div style={{ width: '100%' }}>
                <Grid xs={12} container noWrap style={{ positiion: 'fixed', height: '50px', marginTop: '30px', marginBottom: '90px' }}>
                    <Paper component="form" className={classes.root}>
                        <MuiPickersUtilsProvider utils={MomentUtils} onClick={(event) => this.handleDateChange(event)}>
                            <DatePicker
                                keyboard
                                placeholderText="Select Date"
                                format={"DD/MM/YYYY"}
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                mask={value => value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []}
                                value={this.state.selectedDate}
                                onChange={(event) => this.handleDateChange(event)}
                                disableOpenOnEnter
                                animateYearScrolling={false}
                                autoOk
                                dateFormat='yyyy/MM/dd'
                                style={{ width: '100%' }}
                                onInputChange={e => console.log("Keyboard:", e.target.value)}
                            />
                        </MuiPickersUtilsProvider>
                    </Paper>
                    <div className={classes.grow} />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">SortBy</InputLabel>
                        <Select value={this.state.sortBy} onChange={this.handleSortByChange.bind(this)} label="Age">
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            <MenuItem value='publishedAt'>Published At</MenuItem>
                            <MenuItem value='author'>Author</MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.grow} />
                    <Paper component="form" className={classes.root}>
                        <InputBase className={classes.input} onChange={this.handleArticleTextChange.bind(this)} placeholder="Search Articles" inputProps={{ 'aria-label': 'search articles' }} />
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton onClick={this.searchArticles.bind(this)} className={classes.iconButton} aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>
                </Grid>
                <Article allNewsArticles={this.props.allHeadlines} />
                {this.renderLoader(this.state.isLoaderActive)}
                <Toast variant={this.state.variant} open={this.state.toastOpen} message={this.state.message} handleToastClose={() => this.handleToastClick()} />
            </div>
        );
    }
}

const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});


function mapStateToProps(state, ownProps) {
    return {
        allHeadlines: state.headline !== {} && state.headline.allHeadlines !== undefined ? state.headline.allHeadlines.articles : []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        articleActions: bindActionCreators(newsActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Home)));