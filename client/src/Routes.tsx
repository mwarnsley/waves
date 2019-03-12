import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Shared/Layout';
import Home from './components/Home';
import RegisterLogin from './components/Authentication/RegisterLogin';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register_login" exact component={RegisterLogin} />
            </Switch>
        </Layout>
    );
};

export default Routes;
