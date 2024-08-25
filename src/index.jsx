import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import undoable, { ActionCreators, excludeAction } from "redux-undo";
//import * as Sentry from "@sentry/react";
//import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import { diff } from "deep-object-diff";

import "./helpers";

import App from "./App.jsx";
import { ACTIONS } from "./Constants";
import { rootReducer, undoRedoGroup } from "./reducers";

// Grab current git revision:
import preval from "preval.macro";
const gitRev = preval`module.exports = String(require('child_process').spawnSync("git", ["rev-parse", "HEAD"]).stdout).substr(0, 8)`;
console.log(`Starting badger@${gitRev}-${process.env.NODE_ENV}`);

/*if (navigator.doNotTrack !== 1) {
    Sentry.init({
        dsn: "https://db15f4faf8d9407e9d8ee4ade44addd2@o393671.ingest.sentry.io/5644684",
		autoSessionTracking: false,
        release: `badger@${gitRev}-${process.env.NODE_ENV}`,
        integrations: [new CaptureConsoleIntegration({
            levels: ['warn', 'error', 'debug', 'assert']
        })],
    });
};*/

const logger = store => next => action => {
    if (process.env.NODE_ENV !== "production") {
        console.group(action.type);
        console.info(`dispatching ${action.type}:`, action.payload);
    }
    const oldState = store.getState();
    const result = next(action);
    if (process.env.NODE_ENV !== "production") {
        console.log("DIFF: ", diff(oldState, store.getState()));
        console.groupEnd();
    }
    return result;
};

const store = legacy_createStore(
    undoable(rootReducer, {
        // Actions we don't want be able to undo:
        filter: excludeAction([ACTIONS.TOGGLE_SHOW_MENU, ACTIONS.ADD_MSG, ACTIONS.REMOVE_ALL_MSG]),
        // Some actions
        groupBy: undoRedoGroup,
    }),
    // Use redux devtool if installed, otherwise default to logger + sentry
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() :
        compose(applyMiddleware(logger), Sentry.createReduxEnhancer({}))
);

window.onkeydown = function KeyPress(event) {
    if (event.ctrlKey && event.key === "z") {
        store.dispatch(ActionCreators.undo());
    } else if (event.ctrlKey && (event.key === "y" || (event.shiftKey && event.key === "z"))) {
        store.dispatch(ActionCreators.redo());
    }
};

const container = document.getElementById("root");
createRoot(container).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//import * as serviceWorker from "./serviceWorker";
//serviceWorker.unregister();
