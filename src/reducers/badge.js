/*eslint no-case-declarations: off*/
import produce from "immer";
import { ACTIONS, BADGE_TYPES } from "../Constants";

const getBadgeIndex = (badges, badgeId) => Math.max(0, badges.findIndex(badge => badge.id === badgeId));

export default function badgeReducer(state, action) {
  const badgeId = action.badgeId;
  switch (action.type) {

    case ACTIONS.BADGE_CLONE:
      const { img_connected } = action.payload;
      console.assert(typeof(img_connected) === "boolean", `img_connected: ${img_connected}`);
      return produce(state, draftState => {
        const newBadge = Object.assign({},
          state.badges[getBadgeIndex(state.badges, state.focusedBadgeId)]
        );
        newBadge.id = state.badgeIdCounter;
        newBadge.img_connected = img_connected;
        draftState.badges.push(newBadge);
        draftState.badgeIdCounter += 1;
      });

    case ACTIONS.BADGE_DELETE:
      if (state.badges.length === 1) {
        // If we delete the last badge, we will lose the "badge template"
        return {...state, messages: [...state.messages, "Can't delete the last badge! Press F5 to reset layout."]};
      }
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      
      // Deleting badge in focus? => change focus!
      const newFocusedBadgeId = state.focusedBadgeId === badgeId ? state.badges[0].id : state.focusedBadgeId;

      return {...state,
        focusedBadgeId: newFocusedBadgeId,
        badges: [
          ...state.badges.filter(badge => badge.id !== badgeId),
        ],
      };

    case ACTIONS.BADGE_EDIT:
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      const { focusedPropName, prop, val } = action.payload;
      console.assert(focusedPropName !== "", `focusedPropName: ${focusedPropName}`);
      return produce(state, draftState => {
        draftState.badges[getBadgeIndex(state.badges, badgeId)][focusedPropName][prop] = val;
      });

    case ACTIONS.BADGE_IMAGE_EDIT:
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      return produce(state, draftState => {
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

    case ACTIONS.SET_BADGE_TYPE:
      const { badgeType } = action.payload;
      console.assert(BADGE_TYPES.includes(badgeType), `badgeType: ${badgeType}`);
      return {...state, badgeType: badgeType };

    case ACTIONS.SET_ADDITIONAL_TXT:
      console.assert(typeof(badgeId) === "number", `badgeId: ${badgeId}`);
      const { show } = action.payload;
      console.assert(typeof(show) === "boolean", `show: ${show}`);
      return produce(state, draftState => {
        draftState.badges[getBadgeIndex(state.badges, badgeId)].middle2.style = show ? {} : {display: "none"};
        draftState.badges[getBadgeIndex(state.badges, badgeId)].middle.y += show ? -35 : 35;
      });

    default:
      if (typeof(action.type) === "string" && !action.type.startsWith("@@"))
          console.log(`Unknown type "${action.type}" returning state`, state);
      return state;
  }
}
