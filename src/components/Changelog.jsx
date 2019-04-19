import React, { Component } from 'react';
import preval from 'preval.macro';

const CHANGES = [
    '[<a href="https://nicolaisoeborg.github.io/badger/">v1.x</a>] Idea by <a href="https://github.com/henrikh">Henrik Enggaard</a>.',
    '[v2.x] Rebuild using knockout.js',
    '[v3.0.0] Rebuild using React',
    '[v3.0.3] Bugfixes and easter eggs',
    '[v3.0.4] Add loading bar + better caching',
    '[v3.1.0] Undo / redo (<kbd>CTRL</kbd>+<kbd>z</kbd> and <kbd>CTRL</kbd>+<kbd>y</kbd>)',
]

class Changelog extends Component {
    render() {
        return (
            <div className="menu no-print" style={{float: 'right'}}>
                Build: <code>{preval`module.exports = new Date().toLocaleString();`}</code>
                {CHANGES.map(e => <p dangerouslySetInnerHTML={{__html: e}} />)}
            </div>
        );
    }
}

export default Changelog;
