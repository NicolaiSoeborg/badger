// JS has no enum types, so using this workaround:

export const BADGE_TYPE = {
    Round: "Round",
    Hexagon: "Hexagon",
};

export const BADGE_TYPES = [
    BADGE_TYPE.Round,
    BADGE_TYPE.Hexagon,
];

export const ACTIONS = {
    BADGE_CLONE: "BADGE_CLONE",
    BADGE_DELETE: "BADGE_DELETE",
    BADGE_EDIT: "BADGE_EDIT",
    BADGE_IMAGE_EDIT: "BADGE_IMAGE_EDIT",

    SET_BADGE_TYPE: "SET_BADGE_TYPE",
    SET_ADDITIONAL_TXT: "SET_ADDITIONAL_TXT",

    TOGGLE_SHOW_MENU: "TOGGLE_SHOW_MENU",

    ADD_MSG: "ADD_MSG",
    REMOVE_ALL_MSG: "REMOVE_ALL_MSG",
};
