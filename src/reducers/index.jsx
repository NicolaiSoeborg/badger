import badgeReducer from './badge';

const initialState = {
  showMenu: true,
  messages: [],
  focusedBadgeId: -1,
  focusedPropName: '',
  badgeIdCounter: 1,
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
        style: {display: 'none'},
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

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "TOGGLE_SHOW_MENU":
      return {...state, ...{ showMenu: !state.showMenu }};

    case "ADD_MSG":
      const newMsg = action.payload;
      console.assert(typeof(newMsg) === 'string', `newMsg: ${newMsg}`);
      return {...state, messages: [...state.messages, newMsg]};

    case "REMOVE_ALL_MSG":
      return {...state, messages: []};

    default:
      //console.log(`root: Unknown type "${action.type}" returning state ${state}`);
      return badgeReducer(state, action);
  }
};
