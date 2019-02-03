import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareBg: true,
        }
    }

    cloneBadge = (event) => {
        this.props.dispatch({
            type: 'BADGE_CLONE',
            payload: {
                img_connected: this.state.shareBg,
            }
        });
    }
    toggleShareBg = (event) => {
        this.setState({ shareBg: !this.state.shareBg });
    }
    showHelp = (event) => {
        const intro = window.introJs();
        intro.setOptions({
            showStepNumbers: false,
            showProgress: false,
            showBullets: false,
            //skipLabel: "Imma Let You Finish",
            steps: [
                {
                    intro: "This is the current badge design. The innermost circle is the visible part of the badge, the outermost circle is the 'wrap around' part of the badge.",
                    element: document.getElementsByClassName("draggable")[2] || document.getElementsByClassName("draggable")[0]
                },
                /*{
                    intro: "To change background image, double click inside the badge circle (not on the text). Protip: make sure to select a image without too much 'noice' or the text might be hard to see on the print.",
                    element: document.getElementsByClassName("draggable")[0]
                }*/
                /*{
                    intro: "If you need additional fonts, you can install them on your computer and need to type the exact name of the font.",
                    element: document.getElementById("fonts")
                },*/
                {
                    intro: "When the badge design is done, use this button to clone the current badge. If the checkbox is checked, then moving/scaling the background image on one badge will also move/scale the background image on the other badges.",
                    element: document.getElementById("clone")
                },
                {
                    intro: "When everything is done, click this button and select 'menu &rarr; print' (not Ctrl + P). Make sure the webpage isn't zoomed in, and that the printer setting is set to A4.",
                    element: document.getElementById("togglePrint")
                },
                {
                    intro: "Happy badging!  Please report any errors/feedback to Nicolai Søborg (<a href='mailto:badger@xn--sb-lka.org'>badger@søb.org</a>)."
                }
            ]
        });
        intro.start();
    }
    preparePrint = (event) => {
        this.props.dispatch({ type: 'TOGGLE_SHOW_MENU' });
    }
    
    componentDidMount() {
        const that = this; // <-- fuck javascript
        // DOM should be ready, but add a small delay to make sure:
        setTimeout(function(event) {
            if (localStorage.getItem("runOnce") !== "true") {
                localStorage.setItem("runOnce", "true");
                that.showHelp(event);
            }
        }, 0);
    }

    render () {
        return (
            <span className="no-print">
                <strong>Badger!</strong>&nbsp;&nbsp;
                <span id="clone">
                    <a href="#clone" onClick={this.cloneBadge}>clone badge</a>
                    <input id="shareBg" type="checkbox" checked={this.state.shareBg} onChange={this.toggleShareBg} title="If checked, then new (cloned) badges will share the same background image (you probably want this to be checked)." />
        		</span>
		        {false && (<>
                    <a href="#save" className="vLine">save badges</a><sup><small>BETA</small></sup>
                    <a href="#load" className="vLine">load badges</a>
                </>)}
                <a href="#help" onClick={this.showHelp} className="vLine">help</a>{/*onClick="startIntro()"*/}
                <a href="#print" onClick={this.preparePrint} className="vLine">{this.props.showMenu ? "PREPARE FOR PRINT" : "SHOW MENU"}</a>
            </span>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showMenu: state.showMenu,
    }
}

export default connect(mapStateToProps)(TopBar);
