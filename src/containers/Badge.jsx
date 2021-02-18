import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ACTIONS, BADGE_TYPE } from "../Constants";
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

    rotateImg = (event) => {
        this.props.dispatch({
            type: ACTIONS.BADGE_IMAGE_EDIT,
            badgeId: this.props.data.id,
            payload: {
                rotate: event.target.value,
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

        const badgeSize =
            this.props.badgeType === BADGE_TYPE.Round ? 300 :
            this.props.badgeType === BADGE_TYPE.Hexagon ? 180 : -1;

        const outermostBorderStyle = {
            stroke: "black", strokeWidth: ".1mm", strokeDasharray: "5,5", fill: "transparent", className: "draggable"
        };

        // Browsers doesn't support setting a `path` in a TextPath element...
        // So instead we need TextPath to have a `href="#uniqId"` and put the path in:
        // <path id="uniqId" d="path here" />
        const uniqPathId = `path-${this.props.data.id}`;

        return (
            <div className="badge" /*onMouseOut={this.stopMove}*/>
                <svg version="1.1" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <path id={`upper-${uniqPathId}`} d={this.props.data.upperPath.path}></path>
                        <path id={`lower-${uniqPathId}`} d={this.props.data.lowerPath.path}></path>
                    </defs>
                </svg>

                {this.props.showMenu && <button className="closeBtn no-print" onClick={this.deleteBadge} title="Delete badge">X</button>}
                <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"
                     width={badgeSize} height={badgeSize} transform={`rotate(${this.props.data.img.rotate})`}
                     onMouseDown={this.beginMove} onMouseMove={this.doMove} onMouseUp={this.stopMove} onDoubleClick={this.changeBackground}
                >
                    {this.props.showMenu && /* Innermost image */
                        <image {...this.props.data.img} className="draggable" clipPath="url(#badge-cutoff)" onDragStart={stopDrag} />}
                    {this.props.showMenu && /* + background */
                        <image {...this.props.data.img} className="draggable no-print" style={{opacity: 0.2}} onDragStart={stopDrag} />}
                    {!this.props.showMenu /* ... or just the outermost image (when printing) */
                        && <image {...this.props.data.img} clipPath="url(#badge-full)" onDragStart={stopDrag} />}

                    {/* The outermost border (always visible) */}
                    {this.props.badgeType === BADGE_TYPE.Round ? (
                        <circle {...outermostBorderStyle} {...this.props.border} />
                    ) : this.props.badgeType === BADGE_TYPE.Hexagon ? (
                        <path {...outermostBorderStyle} {...this.props.border}></path>
                    ) : (console.warn(`No outermost border defined for ${this.props.badgeType}`))}

                    <text onDoubleClick={e => { e.stopPropagation(); } }>
                        {/* contenteditable="true" */}
                        <textPath onClick={e => this.props.changeFocus(this.props.data.id, "upperPath")} {...this.props.data.upperPath} href={`#upper-${uniqPathId}`}>{this.props.data.upperPath.text || "\u00A0"}</textPath>
                        <tspan onClick={e => this.props.changeFocus(this.props.data.id, "middle")} {...this.props.data.middle}>{this.props.data.middle.text || "\u00A0"}</tspan>
                        <tspan onClick={e => this.props.changeFocus(this.props.data.id, "middle2")} {...this.props.data.middle2}>{this.props.data.middle2.text || "\u00A0"}</tspan>
                        <textPath onClick={e => this.props.changeFocus(this.props.data.id, "lowerPath")} {...this.props.data.lowerPath} href={`#lower-${uniqPathId}`}>{this.props.data.lowerPath.text || "\u00A0"}</textPath>
                    </text>
                </svg>
                <br />
                <ImgUpload id={this.props.data.id} />
                {this.props.showMenu &&
                    <span className="no-print">
                        Scale: <input type="range" min="0.01" max="5" step="0.01" value={this.props.data.img.scale} onChange={this.scaleImg} />
                        <div style={{transform: `translate(${badgeSize/2}px, -80px) rotate(90deg)`}}>
                            Rotate: <input type="range" min="0" max="360" step="1" value={this.props.data.img.rotate} onChange={this.rotateImg} />
                        </div>
                    </span>}
            </div>
        );
    }
}

Badge.propTypes = {
    data: PropTypes.object.isRequired,
    badgeType: PropTypes.string.isRequired,
    changeFocus: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        badgeType: state.present.badgeType,
        showMenu: state.present.showMenu,
    };
};

export default connect(mapStateToProps)(Badge);
