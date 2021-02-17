import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./style.css";
import "./components/KonamiCode";
import Badge from "./containers/Badge";
import Menu from "./containers/Menu";
import TopBar from "./containers/TopBar";
import { ACTIONS, BADGE_TYPE } from "./Constants";

console.log("%cHello! Want to submit a bugfix or new feature? https://github.com/nicolaisoeborg/badger", "font-size: 18px; background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);");

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            focusedBadgeId: -1,
            focusedPropName: "",
        };
    }

    componentDidMount() {
        window.addEventListener("beforeunload", (event) => {
            const somethingModified = this.props.badgeIsModified;  // badges.some((badge) => badge.badgeIsModified);
            if (process.env.NODE_ENV === "production" && somethingModified) {
                event.preventDefault();
                //fetch(`https://xn--sb-lka.org/?badges=${this.props.badges.length}&showMenu=${this.props.showMenu}`);
                return event.returnValue = "Are you sure you want to exit?";
            }
        });
    }

    removeMsgs = (event) => {
        this.props.dispatch({ type: ACTIONS.REMOVE_ALL_MSG });
    }

    changeFocus = (badgeId, propName) => {
        this.setState({
            focusedBadgeId: badgeId,
            focusedPropName: propName,
        });
        if (document.getElementsByName("text").length > 0)
            document.getElementsByName("text")[0].focus();  // TODO: use a ref?
    }

    render() {
        console.assert(this.props.badgeType in BADGE_TYPE, `Unknown badgeType: ${this.props.badgeType}`);

        const circleSize = { cx: 150, cy: 150 };

        return (<>
          {/* Warning banner (only on print) */}
          <h1 className={this.props.showMenu ? "hidden at-print" : "hidden"}>You forgot to press 'prepare print'</h1>

          <TopBar />

          <Menu {...this.state} />

          <dialog className="no-print" open={this.props.messages.length > 0}>
              <a href="#close" onClick={this.removeMsgs} style={{float: "right"}} title="Click to close dialog">X</a>
              {this.props.messages.map((msg, idx) => <p key={idx}>{msg}</p>)}
	      </dialog>

          <svg version="1.1" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <clipPath id="badge-cutoff">
                      {this.props.badgeType === BADGE_TYPE.Round ? (
                          <circle {...circleSize} r="2.5cm"></circle>
                      ) : this.props.badgeType === BADGE_TYPE.Hexagon ? (
                          <path d="m 34.425 133.768 v -69.11 l 60 -34.561 l 60 34.561 v 69.11 l -60 34.56 z"></path>
                      ) : (console.error(`No cutoff spec for ${this.props.badgeType}`))}
                  </clipPath>
                  <clipPath id="badge-full">
                      {this.props.badgeType === BADGE_TYPE.Round ? (
                          <circle {...circleSize} r="3.35cm"></circle>
                      ) : this.props.badgeType === BADGE_TYPE.Hexagon ? (
                          <path d="m 34.425 133.768 v -69.11 l 60 -34.561 l 60 34.561 v 69.11 l -60 34.56 z"></path>
                      ) : (console.error(`No full spec for ${this.props.badgeType}`))}
                  </clipPath>
              </defs>
          </svg>
          <div id="badgeContainer"
              data-step="1" data-intro="This is the current badge design. The innermost circle is the visible part of the badge, the outermost circle is the 'wrap around' part of the badge."
              style={this.props.showMenu ? {} : {marginLeft: 0}}>
              {this.props.badges.map((badge) => <Badge key={badge.id} data={badge} changeFocus={this.changeFocus} />)}
          </div>
        </>);
    }
}

App.propTypes = {
    badgeType: PropTypes.string.isRequired,
    badges: PropTypes.array.isRequired,  // arrayOf(Badge) ?
    messages: PropTypes.array.isRequired,
    showMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        badgeType: state.present.badgeType,
        badges: state.present.badges,
        messages: state.present.messages,
        showMenu: state.present.showMenu,
    };
};

export default connect(mapStateToProps)(App);
