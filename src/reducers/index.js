import preval from "preval.macro";
import { ACTIONS, BADGE_TYPE } from "../Constants";
import badgeReducer from "./badge";

const PREDEFINED_BG = preval`module.exports = require('fs').readdirSync('public/static/bg/');`;
const choose_random = items => items[Math.floor(Math.random() * items.length)];

export const initialStateRound = {
  showMenu: true,
  messages: [],
  badgeIdCounter: 1,
  badgeIsModified: false,
  badgeType: BADGE_TYPE.Round,
  badges: [
    {
      id: 0,
      upperPath: {
        text: "DTU",
        path: "M 80, 150 c 0, -100, 140, -100, 140, 0",
        fontFamily: "Impact",
        fontSize: 25,
        fill: "#FFFFFF", // white text,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
        startOffset: "50%",
      },
      middle: {
        text: "Søborg",
        x: 150,
        y: 175,
        fontFamily: "Impact",
        fontSize: 50,
        fill: "#FFFFFF", // white text,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
      },
      middle2: {
        text: "[add text]",
        style: {display: "none"},
        dx: -150,
        dy: 50,
        fontFamily: "Impact",
        fontSize: 50,
        fill: "#FFFFFF", // white text,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
      },
      lowerPath: {
        text: "C. Software",
        path: "M 60, 150 c 0,  120, 180,  120, 180, 0",
        fill: "#FFFFFF", // white text,
        fontFamily: "Impact",
        fontSize: 25,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
        startOffset: "50%",
      },
      img_connected: true,
      img: {
        href: `static/bg/${choose_random(PREDEFINED_BG.filter(f => f.startsWith("round-")))}`,
        x: -50,
        y: -50,
        scale: 1,
        rotate: 0,
        height: 400,
        width: 400,
      },
    }
  ],
};

export const initialStateHexagon = {
  ...initialStateRound,
  badgeType: BADGE_TYPE.Hexagon,
  badges: [
    {
      id: 0,
      upperPath: {
        text: "DTU",
        path: "M 60 0 l 60 -34.561 l 60 34.561 z",
        fontFamily: "Impact",
        fontSize: 15,
        fill: "#FFFFFF", // white text,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
        startOffset: "50%",
      },
      middle: {
        text: "TXT",
        x: 100,
        y: 115,
        fontFamily: "Impact",
        fontSize: 42,
        fill: "#FFFFFF", // white text,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
      },
      middle2: {
        text: "[add text]",
        style: {display: "none"},
        dx: -130,
        dy: 125,
        fontFamily: "Impact",
        fontSize: 24,
        fill: "#FFFFFF", // white text,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
      },
      lowerPath: {
        text: "C. Software",
        path: "23",
        fill: "#FFFFFF", // white text,
        fontFamily: "Impact",
        fontSize: 25,
        stroke: "#000000", // black outline,
        strokeWidth: 1,
        textAnchor: "middle",
        startOffset: "50%",
      },
      img_connected: true,
      img: {
        href: `static/bg/${choose_random(PREDEFINED_BG.filter(f => f.startsWith("hex-")))}`,
        x: -50,
        y: -50,
        scale: 1,
        rotate: 0,
        height: 400,
        width: 400,
      },
    }
  ],
};

export function rootReducer(state = initialStateRound, action) {
  switch (action.type) {

    case ACTIONS.TOGGLE_SHOW_MENU:
      return {...state, ...{ showMenu: !state.showMenu }};

    case ACTIONS.ADD_MSG:
      console.assert(typeof(action.payload) === "string", `newMsg: ${action.payload}`);
      return {...state, messages: [...state.messages, action.payload]};

    case ACTIONS.REMOVE_ALL_MSG:
      return {...state, messages: []};

    default:
      // Handle all the badge stuff in `src/reducers/badge.js`
      return badgeReducer(state, action);
  }
}

// This function defines the logic for how to group undo/redo events
export function undoRedoGroup(action, currentState, previousHistory) {
  const uniq = `${action.type}-${action.badgeId}`;
  switch (action.type) {

      case ACTIONS.BADGE_IMAGE_EDIT:
          // Distinct between moving background and resizing:
          return `${uniq}-${"scale" in action.payload}`;

      case ACTIONS.BADGE_EDIT:
          return `${uniq}-${action.payload.focusedPropName}-${action.payload.prop}`;

      case ACTIONS.BADGE_CLONE:
      case ACTIONS.BADGE_DELETE:
      case ACTIONS.SET_BADGE_TYPE:
      case ACTIONS.SET_ADDITIONAL_TXT:
          return `${uniq}`;

      default:
          console.warn(`Unhandled undo/redo action: ${action.type}`);
          return null;
  }
}
