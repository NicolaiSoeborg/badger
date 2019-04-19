import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FontSelector from "../components/Font";
import MusicPlayer from '../components/MusicPlayer';
import EasterEgg from '../components/EasterEgg';

class Menu extends Component {

    setFont = (font) => {
        this.setVal({ target: { name: 'fontFamily', value: font }})
    }

    setVal = (event) => {
        this.props.dispatch({
            type: 'BADGE_EDIT',
            badgeId: this.props.focusedBadgeId,
            payload: {
                focusedPropName: this.props.focusedPropName,
                prop: event.target.name,
                val: event.target.value,
            },
        })
    }

    hasVal = (prop) => {
        const idx = this.props.badges.findIndex(badge => badge.id === this.props.focusedBadgeId);
        return idx !== -1 && Object.keys(this.props.badges[idx][this.props.focusedPropName]).includes(prop);
    }

    getVal = (prop) => {
        const idx = this.props.badges.findIndex(badge => badge.id === this.props.focusedBadgeId);
        if (idx === -1) return "";
        return this.props.badges[idx][this.props.focusedPropName][prop];
    }

    addExtraField = (event) => {
        this.props.dispatch({
            type: 'SET_ADDITIONAL_TXT',
            badgeId: this.props.focusedBadgeId,
            payload: { show: event.target.checked },
        })
    }

    changeBackground = (event) => {
        // TODO: should call badge.changeBackground() ?
        document.getElementById(`fileSelect${this.props.focusedBadgeId}`).click(); // activate "select file" diag
    }

    render () {
        if (!this.props.showMenu)
            return null;
        
        if (this.props.focusedBadgeId === -1)
            return (
                <div id="menu" className="menu no-print">Click any element on the badge to change content. &rarr;<br />
                <strong>Tip:</strong> double-click <em>inside</em> the badge (not on the text) to change background image.</div>
            );

        const commonProps = (name) => ({
            name: name,
            value: this.getVal(name),
            onChange: this.setVal,
            style: {width: "94%"},
        });
        return (
            <div id="menu" className="menu no-print">
                <center><strong>MENU</strong></center>
                <label htmlFor="text">Text:</label><br/>
                <input {...commonProps("text")} autoFocus />
                <hr/>
                <label htmlFor="fontSize">Size:</label><br/>
                <input {...commonProps("fontSize")} type="number" />
                {this.hasVal("x") && this.hasVal("y") && <>
                    <hr/>
                    <label htmlFor="x">x:</label>
                    <input {...commonProps("x")} type="number" style={{width: "30%"}} />
                    <label htmlFor="y">y:</label>
                    <input {...commonProps("y")} type="number" style={{width: "30%"}} />
                </>}
                {this.props.focusedPropName === 'middle2' && <>
                    <hr/>
                    <label htmlFor="dx">dx:</label>
                    <input {...commonProps("dx")} type="number" style={{width: "30%"}} />
                    <label htmlFor="dy">dy:</label>
                    <input {...commonProps("dy")} type="number" style={{width: "30%"}} />
                </>}
                <hr/>
                <label htmlFor="fill">Text color:</label><br/>
                <input {...commonProps("fill")} type="color" />
                <hr/>
                <label htmlFor="stroke">Stroke color:</label><br/>
                <input {...commonProps("stroke")} type="color" />
                <hr/>
                <label htmlFor="strokeWidth">Stroke width:</label><br/>
                <input {...commonProps("strokeWidth")} type="number" />
                <hr/>
                <FontSelector selectedFont={this.getVal("fontFamily")} setFont={this.setFont} />
                <hr/>
                <button onClick={this.changeBackground}>Change background</button>
                <hr/>
                <details>
                    <summary>ADVANCED</summary>
                    <span>Add extra text field: <input type="checkbox" onChange={this.addExtraField} /></span>
                    <br/>
                    <MusicPlayer />
                    <br/>
                    <EasterEgg />
                </details>
            </div>
        )
    }
}

Menu.propTypes = {
    focusedBadgeId: PropTypes.number.isRequired,
    focusedPropName: PropTypes.string.isRequired,
    badges: PropTypes.array.isRequired,
    showMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        badges: state.present.badges,
        showMenu: state.present.showMenu,
    }
}

export default connect(mapStateToProps)(Menu);
