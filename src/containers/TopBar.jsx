import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ACTIONS, BADGE_TYPES } from "../Constants";
import Changelog from "../components/Changelog";
import Examples from "../components/Examples";

import preval from "preval.macro";
const VERSION = preval`module.exports = JSON.parse(require('fs').readFileSync('package.json'))['version']`;

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareBg: true,
            showChangelog: false,
            showExamples: false,
        };

        const that = this;
        window.addEventListener("beforeprint", function(event) {
            if (that.props.showMenu) {
                that.preparePrint();
            }
        });
    }

    cloneBadge = (event) => {
        this.props.dispatch({
            type: ACTIONS.BADGE_CLONE,
            payload: {
                img_connected: this.state.shareBg,
            }
        });
    }

    toggleChangelog = (event) => {
        this.setState({ showChangelog: !this.state.showChangelog });
    }

    toggleExamples = (event) => {
        this.setState({ showExamples: !this.state.showExamples },
        () => {
            if (this.state.showExamples) {
                document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
            } else {
                document.body.style.backgroundColor = "";
            }
        });
    }

    toggleShareBg = (event) => {
        this.setState({ shareBg: !this.state.shareBg });
    }

    toggleBadgeType = (event) => {
        this.props.dispatch({
            type: ACTIONS.SET_BADGE_TYPE,
            payload: {
                badgeType: document.getElementById("selectedBadgeType").value,
            }
        });
    }

    showHelp = (event) => {
        const intro = window.introJs();
        intro?.setOptions({
            showStepNumbers: false,
            showProgress: false,
            showBullets: false,
        });
        intro?.start();
    }

    preparePrint = (event) => {
        this.props.dispatch({ type: ACTIONS.TOGGLE_SHOW_MENU });
    }

    componentDidMount() {
        const that = this;
        // DOM should be ready, but add a small delay to make sure:
        setTimeout(function(event) {
            if (localStorage.getItem("runOnce") !== "true") {
                localStorage.setItem("runOnce", "true");
                that.showHelp(event);
            }
        }, 5);
    }

    render () {
        return (<>
            <span className="no-print">
                <strong>Badger!</strong>&nbsp;&nbsp;
                <span id="clone" data-step="997" data-intro="When the badge design is done, use this button to clone the current badge. If the checkbox is checked, then moving/scaling the background image on one badge will also move/scale the background image on the other badges.">
                    <a href="#clone" onClick={this.cloneBadge}>clone badge</a>
                    <input id="shareBg" type="checkbox" checked={this.state.shareBg} onChange={this.toggleShareBg} title="If checked, then new (cloned) badges will share the same background image (you probably want this to be checked)." />
        		</span>
		        {false && (<>
                    <a href="#save" className="vLine">save badges</a><sup><small>BETA</small></sup>
                    <a href="#load" className="vLine">load badges</a>
                </>)}
                <a href="#help" onClick={this.showHelp} className="vLine">help</a>{/*onClick="startIntro()"*/}
                <a href="#examples" onClick={this.toggleExamples} className="vLine">examples</a>
                <a href="#print" onClick={this.preparePrint}
                    data-step="998" data-intro="When everything is done, click this button and select 'browser-menu &rarr; print' (not <kbd>CTRL</kbd>+<kbd>P</kbd>). Make sure the webpage isn't zoomed in, and that the printer setting is set to A4."
                    className="vLine">{this.props.showMenu ? "PREPARE FOR PRINT" : "SHOW MENU"}</a>
                
                <span style={{float: "right"}}>
                    Badge type:&nbsp;
                    <select id="selectedBadgeType" data-step="998" data-intro="You can choose different badge types, but don't do it while designing the badge." onChange={this.toggleBadgeType}>
                        {BADGE_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                    &nbsp; &nbsp;
                    <a href="#changelog" onClick={this.toggleChangelog} data-step="999" data-intro="Happy badging!  Please report any errors/feedback to Nicolai Søborg (<a href='mailto:badger@xn--sb-lka.org'>badger@søb.org</a>).">v{VERSION}</a>
                    {this.state.showChangelog && this.props.showMenu && <><br /><Changelog /></>}
                </span>
            </span>
            {this.state.showExamples && (<Examples onClose={this.toggleExamples} />)}
        </>);
    }
}

TopBar.propTypes = {
    showMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        showMenu: state.present.showMenu,
    };
};

export default connect(mapStateToProps)(TopBar);
