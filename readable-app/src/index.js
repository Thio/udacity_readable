import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/animate.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
//<Provider store={store}>
<BrowserRouter><App /></BrowserRouter>
//</Provider>
, document.getElementById('root'));
registerServiceWorker();
