import { produce } from "immer";
import { gen_random_id } from "../helpers";
import { ACTIONS, BADGE_TYPE, BADGE_TYPES } from "../Constants";
import { initialStateRound, initialStateHexagon } from "../state";

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

const getBadgeIndex = (badges, badgeId) => Math.max(0, badges.findIndex(badge => badge.id === badgeId));

function badgeReducer(state, action) {
  const badgeId = action.badgeId;
  switch (action.type) {

    case ACTIONS.BADGE_CLONE: {
      const { img_connected } = action.payload;
      console.assert(typeof(img_connected) === "boolean", `img_connected: ${img_connected}`);
      return produce(state, draftState => {
        // Copy the first badge:
        const newBadge = Object.assign({}, state.badges[0]);
        newBadge.id = gen_random_id();
        newBadge.img_connected = img_connected;
        draftState.badges.push(newBadge);
      });
    }

    case ACTIONS.BADGE_DELETE:
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);

      return produce(state, draftState => {
        if (state.badges.length === 1) {
          // If we delete the last badge, we will lose the "badge template"
          draftState.messages.push("Can't delete the last badge! Press F5 to reset layout.");
        } else {
          draftState.badges = state.badges.filter(badge => badge.id !== badgeId);
        }
      });

    case ACTIONS.BADGE_EDIT: {
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      const { focusedPropName, prop, val } = action.payload;
      console.assert(focusedPropName !== "", `focusedPropName: ${focusedPropName}`);
      return produce(state, draftState => {
        draftState.badges[getBadgeIndex(state.badges, badgeId)][focusedPropName][prop] = val;
        draftState.badgeIsModified = true;
      });
    }

    case ACTIONS.BADGE_IMAGE_EDIT:
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      return produce(state, draftState => {
        draftState.badgeIsModified = true;

        // Edit current badge:
        for (const [k, v] of Object.entries(action.payload)) {
          draftState.badges[getBadgeIndex(state.badges, badgeId)].img[k] = v;
        }
        // And update all other connected badges:
        if (draftState.badges[getBadgeIndex(state.badges, badgeId)].img_connected) {
          for (let i = 0; i < draftState.badges.length; i++) {
            if (draftState.badges[i].id === badgeId) continue;
            if (draftState.badges[i].img_connected) {
              for (const [k, v] of Object.entries(action.payload)) {
                draftState.badges[i].img[k] = v;
              }
            }
          }
        }
      });

    case ACTIONS.SET_BADGE_TYPE: {
      const { badgeType } = action.payload;
      console.assert(BADGE_TYPES.includes(badgeType), `badgeType: ${badgeType}`);
      return produce(state, draftState => {
        draftState.badgeType = badgeType;
        if (state.badgeIsModified === false) {
          // The default template doesn't fit both round and hexagon badges
          if (badgeType === BADGE_TYPE.Round) {
            draftState.badges = initialStateRound.badges;
            draftState.border_def = initialStateRound.border_def;
          } else if (badgeType === BADGE_TYPE.Hexagon) {
            draftState.badges = initialStateHexagon.badges;
            draftState.border_def = initialStateHexagon.border_def;
          } else {
            console.warn(`Unknown badgeType: ${badgeType}`);
          }
        }
      });
    }

    case ACTIONS.SET_ADDITIONAL_TXT: {
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      const { show } = action.payload;
      console.assert(typeof(show) === "boolean", `show: ${show}`);
      return produce(state, draftState => {
        draftState.badges[getBadgeIndex(state.badges, badgeId)].middle2.style = show ? {} : {display: "none"};
        draftState.badges[getBadgeIndex(state.badges, badgeId)].middle.y += show ? -35 : 35;
      });
    }

    default:
      if (typeof(action.type) === "string" && !action.type.startsWith("@@"))
          console.warn(`Unknown type "${action.type}" returning state`, state);
      return state;
  }
}


// This function defines the logic for how to group undo/redo events
export function undoRedoGroup(action, currentState, previousHistory) {  // eslint-disable-line no-unused-vars
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
