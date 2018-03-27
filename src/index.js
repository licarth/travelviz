import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import SearchEngine from './SearchEngineJs';

const loggerMiddleware = createLogger()

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ),
)

const searchEngine = new SearchEngine(store);

ReactDOM.render(
    <Provider store={store}>
        <Dashboard />
    </Provider>
    , document.getElementById('root'
    ));
registerServiceWorker();
