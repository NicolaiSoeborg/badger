/*eslint no-unused-vars: off*/

// This function defines the logic for how to group undo/redo events
export default function undoRedoGroup(action, currentState, previousHistory) {
    const uniq = `${action.type}-${action.badgeId}`;
    switch (action.type) {

        case "BADGE_IMAGE_EDIT":
            // Distinct between moving background and resizing:
            return `${uniq}-${"scale" in action.payload}`;

        case "BADGE_EDIT":
            return `${uniq}-${action.payload.focusedPropName}-${action.payload.prop}`;

        case "BADGE_CLONE":
        case "BADGE_DELETE":
        case "SET_ADDITIONAL_TXT":
            return `${uniq}`;

        default:
            console.warn(`Unhandled undo/redo action: ${action.type}`);
            return null;
    }
}
