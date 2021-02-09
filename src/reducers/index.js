import { ACTIONS, BADGE_TYPES } from "../Constants";
import badgeReducer from "./badge";

export const initialStateRound = {
  showMenu: true,
  messages: [],
  badgeIdCounter: 1,
  badgeIsModified: false,
  badgeType: BADGE_TYPES[0],
  badges: [
    {
      id: 0,
      upper: {
        text: "DTU",
        href: "#upper-path",
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
      lower: {
        text: "C. Software",
        href: "#lower-path",
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
        href: `static/${Math.floor(Math.random()*4) + 1}.png`,
        x: -50,
        y: -50,
        scale: 1,
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
