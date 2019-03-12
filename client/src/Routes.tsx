import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Shared/Layout';
import Home from './components/Home';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Layout>
    );
};

export default Routes;
