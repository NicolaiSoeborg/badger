import preval from "preval.macro";
import { BADGE_TYPE } from "./Constants";

const PREDEFINED_BG = preval`module.exports = require('fs').readdirSync('public/static/bg/');`;
const choose_random = items => items[Math.floor(Math.random() * items.length)];

const initialState = {
  showMenu: true,
  messages: [],
  badgeIdCounter: 1,  // used to generate uniq badge IDs
  badgeIsModified: false,
  badges: []
};

export const initialStateRound = {
  ...initialState,
  badgeType: BADGE_TYPE.Round,
  // These are defined once (e.g. circle size):
  border_def: {
    cutoff: { cx: 150, cy: 150, r: "2.5cm", },
    full: { cx: 150, cy: 150, r: "3.35cm", },
  },
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
      border: {
        cx: 150, cy: 150, r: "3.35cm",
      },
    }
  ],
};

export const initialStateHexagon = {
  ...initialState,
  badgeType: BADGE_TYPE.Hexagon,
  // These are defined once (e.g. circle size):
  border_def: {
    cutoff: { d: "m 34.425 133.768 v -69.11 l 60 -34.561 l 60 34.561 v 69.11 l -60 34.56 z", },
    full: { d: "m 34.425 133.768 v -69.11 l 60 -34.561 l 60 34.561 v 69.11 l -60 34.56 z", },
  },
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
      border: {
        d: "m 34.425 133.768 v -69.11 l 60 -34.561 l 60 34.561 v 69.11 l -60 34.56 z",
      },
    }
  ],
};