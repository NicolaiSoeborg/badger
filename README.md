Badger
======
[![GitHub issues](https://img.shields.io/github/issues/NicolaiSoeborg/badger.svg)](https://github.com/NicolaiSoeborg/badger/issues)
[![Beerpay](https://beerpay.io/NicolaiSoeborg/badger/badge.svg?style=flat)](https://beerpay.io/NicolaiSoeborg/badger)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/NicolaiSoeborg/badger/master/LICENSE)

The one true way to make badge sheets for printing (each badge is 300x300 px).

New version of Badger 3.x is located at <https://badger.søb.org/>.

Feel free to create pull requests!

# Run

 * `yarn` to download `node_modules` (you will get a some warnings, this is due to `react-scripts` being crappy)

 * `yarn start` or `yarn build`

## Code structure

In `src/reducers/index.jsx` the badge model is defined.
All components and containers can manage their themself using state/props but all actions on badges / across components should be managed using:

```js
this.props.dispatch({
    type: "...",
    badgeId?: specificBadge,
    payload: { ... },
});
```

Using `redux-undo` (in `src/index.jsx`) actions will automatically be undo/redoable.
In `undoRedoGroup` we define how group events, i.e. moving the image 20px should not generate 20 undoable actions!

## Dependencies

In general I've tried to keep dependencies to a minimal, but react has a billion dependencies ... so maybe it doesn't matter, but please try to not add unnecessary dependencies. In 2021 I can proudly announce that badger is not depending on `left-pad`!
