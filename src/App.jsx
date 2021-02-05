import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./style.css";
import "./components/KonamiCode";
import Badge from "./containers/Badge";
import Menu from "./containers/Menu";
import TopBar from "./containers/TopBar";

console.log("%cHello! Want to submit a bugfix or new feature? https://github.com/nicolaisoeborg/badger", "color: blue; font-size: 15px;");

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
            if (process.env.NODE_ENV === "production") {
                event.preventDefault();
                //fetch(`https://xn--sb-lka.org/?badges=${this.props.badges.length}&showMenu=${this.props.showMenu}`);
                return event.returnValue = "Are you sure you want to exit?";
            }
        });
    }

    removeMsgs = (event) => {
        this.props.dispatch({ type: "REMOVE_ALL_MSG" });
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
        const circleSize = {
            cx: 150,
            cy: 150,
        };

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
                    <circle {...circleSize} r="2.5cm"></circle>
                  </clipPath>
                  <clipPath id="badge-full">
                    <circle {...circleSize} r="3.35cm"></circle>
                  </clipPath>
                  <path id="upper-path" d="M 80, 150 c 0, -100, 140, -100, 140, 0"></path>
                  <path id="lower-path" d="M 60, 150 c 0,  120, 180,  120, 180, 0"></path>
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
    badges: PropTypes.array.isRequired,  // arrayOf(Badge) ?
    messages: PropTypes.array.isRequired,
    showMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        badges: state.present.badges,
        messages: state.present.messages,
        showMenu: state.present.showMenu,
    };
};

export default connect(mapStateToProps)(App);
