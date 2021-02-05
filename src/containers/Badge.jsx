import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ACTIONS } from "../Constants";
import ImgUpload from "../components/ImgUpload";

class Badge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouse: {
                moving: false,
            }
        };
    }

    beginMove = (event) => {
        this.setState({
            mouse: {
                ...this.state.mouse,
                x: event.clientX,
                y: event.clientY,
                moving: true,
            }
        });
    }

    doMove = (event) => {
        if (this.state.mouse.moving) {
            const diffX = event.clientX - this.state.mouse.x,
                diffY = event.clientY - this.state.mouse.y;
            this.props.dispatch({
                type: ACTIONS.BADGE_IMAGE_EDIT,
                badgeId: this.props.data.id,
                payload: {
                    x: this.props.data.img.x + diffX,
                    y: this.props.data.img.y + diffY,
                }
            });
            this.setState({
                mouse: { // Reset mouse coords:
                    ...this.state.mouse,
                    x: event.clientX,
                    y: event.clientY,
                }
            });
        }
    }

    stopMove = (event) => {
        this.setState({
            mouse: {
                ...this.state.mouse,
                moving: false,
            }
        });
    }

    deleteBadge = (event) => {
        this.props.dispatch({ type: ACTIONS.BADGE_DELETE, badgeId: this.props.data.id });
    }

    scaleImg = (event) => {
        const newSize = 400 * event.target.value;
        this.props.dispatch({
            type: ACTIONS.BADGE_IMAGE_EDIT,
            badgeId: this.props.data.id,
            payload: {
                // Update UI:
                scale: event.target.value,
                // Make sure the image zooms in on the middle, and not down-right:
                x: this.props.data.img.x + (this.props.data.img.width - newSize)/2,
                y: this.props.data.img.y + (this.props.data.img.height - newSize)/2,
                // Then scale image:
                width: newSize,
                height: newSize,

            }
        });
    }

    changeBackground = (event) => {
        // Note-to-self: 'ondblclick' isn't actually defined on svg elements,
		// but just happens to work in Chrome and IE, but not FF.
        // Link: https://bugzilla.mozilla.org/show_bug.cgi?id=360145
        // One can use 'event.detail == 2' to check for double click in onClick,
        // but it seems like react automatically fixes it.
        document.getElementById(`fileSelect${this.props.data.id}`).click(); // activate "select file" diag
    }

    render () {
        // Make sure that when moving bg image, the browser wont make "drag-out" effect
        const stopDrag = e => e.preventDefault();
        return (
            <div className="badge" /*onMouseOut={this.stopMove}*/>
                {this.props.showMenu && <button className="closeBtn no-print" onClick={this.deleteBadge} title="Delete badge">X</button>}
                <svg version="1.1" baseProfile="full" width="300" height="300" xmlns="http://www.w3.org/2000/svg"
                    onMouseDown={this.beginMove} onMouseMove={this.doMove} onMouseUp={this.stopMove} onDoubleClick={this.changeBackground}>
                    {this.props.showMenu && /* Innermost image */
                        <image {...this.props.data.img} className="draggable" clipPath="url(#badge-cutoff)" onDragStart={stopDrag} />}
                    {this.props.showMenu && /* + background */
                        <image {...this.props.data.img} className="draggable no-print" style={{opacity: 0.2}} onDragStart={stopDrag} />}
                    {!this.props.showMenu /* ... or just the outermost image (when printing) */
                        && <image {...this.props.data.img} clipPath="url(#badge-full)" onDragStart={stopDrag} />}

                    {/* The outermost circle (always visible) */}
                    <circle cx={150} cy={150} r="3.35cm"
                        stroke="black" strokeWidth=".1mm" strokeDasharray="5,5"
                        fill="transparent" className="draggable" />

                    <text onDoubleClick={e => { e.stopPropagation(); } }>
                        {/* contenteditable="true" */}
					    <textPath onClick={e => this.props.changeFocus(this.props.data.id, "upper")} {...this.props.data.upper}>{this.props.data.upper.text || "\u00A0"}</textPath>
                        <textPath onClick={e => this.props.changeFocus(this.props.data.id, "lower")} {...this.props.data.lower}>{this.props.data.lower.text || "\u00A0"}</textPath>
                        <tspan onClick={e => this.props.changeFocus(this.props.data.id, "middle")} {...this.props.data.middle}>{this.props.data.middle.text || "\u00A0"}</tspan>
                        <tspan onClick={e => this.props.changeFocus(this.props.data.id, "middle2")} {...this.props.data.middle2}>{this.props.data.middle2.text || "\u00A0"}</tspan>
	    			</text>
                </svg>
                <br />
                <ImgUpload id={this.props.data.id} />
                {this.props.showMenu &&
                    <span className="no-print">
				        Scale: <input type="range" min="0.01" max="5" step="0.01" value={this.props.data.img.scale} onChange={this.scaleImg} />
			        </span>}
            </div>
        );
    }
}

Badge.propTypes = {
    data: PropTypes.object.isRequired,
    changeFocus: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        showMenu: state.present.showMenu,
    };
};

export default connect(mapStateToProps)(Badge);
