import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import undoable, { ActionCreators, excludeAction } from 'redux-undo';
import rootReducer from './reducers';
import undoRedoGroup from './undo';

import { diff } from 'deep-object-diff';

import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

const logger = store => next => action => {
    console.group(action.type);
    console.info(`dispatching ${action.type}:`, action.payload);
    const oldState = store.getState();
    const result = next(action);
    console.log('DIFF: ', diff(oldState, store.getState()));
    console.groupEnd();
    return result;
};

const store = createStore(
    undoable(rootReducer, {
        filter: excludeAction(["TOGGLE_SHOW_MENU", "ADD_MSG", "REMOVE_ALL_MSG"]),
        groupBy: undoRedoGroup,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : applyMiddleware(logger)
);

window.onkeydown = function KeyPress(event) {
  if (event.ctrlKey && event.key === 'z') {
    store.dispatch(ActionCreators.undo());
  } else if (event.ctrlKey && event.key === 'y') {
    store.dispatch(ActionCreators.redo());
  }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();