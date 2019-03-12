import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './Resources/css/styles.css';

import reducers from './reducers';
import { IAppState } from './utils/app-state';

const store: Store<IAppState> = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
