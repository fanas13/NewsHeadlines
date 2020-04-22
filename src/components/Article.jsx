import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { AccessTime, AccountCircle } from '@material-ui/icons';

import moment from 'moment';

class Article extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {};
    }

    render() {
        const headlines = this.props.allNewsArticles;

        if (headlines !== null && headlines !== undefined) {
            const renderHeadline = Object.keys(headlines).map((key) => {
                const author = headlines[key].author;
                const title = headlines[key].title;
                const articleImage = headlines[key].urlToImage;
                const publishDate = headlines[key].publishedAt;

                return (
                    <Grid md={2} container item style={{ display: 'block', padding: '15px' }}>
                        <div className="container">
                            <div className="thumbnailContainer">
                                <img src={articleImage} alt="Avatar" className="image" style={{ width: '290px' }} />
                            </div>
                            <div className="articleCopyContainer">
                                <Typography className="articleTitleCopy">The best VPN service for 2020 - CNET</Typography>
                                <Typography className="dateTimeCopy">{author} <AccountCircle className="smallIcons" /></Typography>
                                <Typography className="dateTimeCopy">{moment(publishDate).format('YYYY-MM-DD HH:mm')} <AccessTime className="smallIcons" /></Typography>
                            </div>
                            <div className="middle">
                                <Typography className="text">{title}</Typography>
                            </div>
                        </div>
                    </Grid>
                );
            });

            return (
                <Grid xs={12} container>
                    {renderHeadline}
                </Grid>
            );
        } else
            return (
                <div />
            );
    }
}

export default Article;