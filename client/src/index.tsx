
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './Resources/css/styles.css';



ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
