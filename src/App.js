import React, { Component } from 'react';
import { Route } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';

export class App extends Component {
    render() {
        return (
            <Layout>
                <Route path='/' component={Home} />
            </Layout>);
    }
}

export default App;