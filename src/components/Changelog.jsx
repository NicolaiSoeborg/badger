import React, { Component } from "react";
import preval from "preval.macro";

const CHANGES = [
    "[<a target='_blank' href='https://nicolaisoeborg.github.io/badger/'>v1.x</a>] Idea by <a target='_blank' href='https://github.com/henrikh'>Henrik Enggaard</a>.",
    "[v2.x] Rebuild using knockout.js",
    "[v3.0.0] Rebuild using React",
    "[v3.0.3] Bugfixes and easter eggs",
    "[v3.0.4] Add loading bar + better caching",
    "[v3.1.0] Undo / redo (<kbd>CTRL</kbd>+<kbd>z</kbd> and <kbd>CTRL</kbd>+<kbd>y</kbd>)",
    "[v3.2.0] Examples of good badge designs",
    "[v3.2.1] Bump dependencies",
    "[v3.3.0] New badge type: <a target='_blank' title='for making awesome stickers' href='https://sticker.how/'>Hexagon</a>",
    "[v3.3.1] Allow changing text path and rotation",
    "[v3.3.2] Allowing hexagon stickers (!)",
    "[v3.3.3] Fix delete badge button",
    "[v3.3.4] Updated to React 18",
];

class Changelog extends Component {
    /*forceReload = () => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.update();
            });
        }
    }*/
    render() {
        return (
            <div className="menu no-print" style={{float: "right"}}>
                Build: <code>{preval`module.exports = new Date().toLocaleString();`}</code>
                {CHANGES.map(e => <p key={e} dangerouslySetInnerHTML={{__html: e}} />)}
                {/*<hr/>
                <button>Force reload page</button>*/}
            </div>
        );
    }
}

export default Changelog;
