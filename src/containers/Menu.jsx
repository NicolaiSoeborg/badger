import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FontSelector from "../components/Font";
import MusicPlayer from '../components/MusicPlayer';

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
            return (<div id="menu" className="no-print">Click any element on the badge to change content. &rarr;<br />
            <strong>Tip:</strong> double-click <em>inside</em> the badge (not on the text) to change background image.</div>);

        return (
            <div id="menu" className="no-print">
                <center><strong>MENU</strong></center>
                <label htmlFor="text">Text:</label><br/>
                <input name="text" value={this.getVal("text")} onChange={this.setVal} style={{width: "94%"}} autoFocus />
                <hr/>
                <label htmlFor="fontSize">Size:</label><br/>
                <input name="fontSize" value={this.getVal("fontSize")} onChange={this.setVal} type="number" style={{width: "94%"}} />
                {this.hasVal("x") && this.hasVal("y") && <>
                    <hr/>
                    <label htmlFor="x">x:</label>
                    <input name="x" value={this.getVal("x")} onChange={this.setVal} type="number" style={{width: "30%"}} />
                    <label htmlFor="y">y:</label>
                    <input name="y" value={this.getVal("y")} onChange={this.setVal} type="number" style={{width: "30%"}} />
                </>}
                {this.props.focusedPropName === 'middle2' && <>
                    <hr/>
                    <label htmlFor="dx">dx:</label>
                    <input name="dx" value={this.getVal("dx")} onChange={this.setVal} type="number" style={{width: "30%"}} />
                    <label htmlFor="dy">dy:</label>
                    <input name="dy" value={this.getVal("dy")} onChange={this.setVal} type="number" style={{width: "30%"}} />
                </>}
                <hr/>
                <label htmlFor="fill">Text color:</label><br/>
                <input name="fill" value={this.getVal("fill")} onChange={this.setVal} type="color" style={{width: "94%"}} />
                <hr/>
                <label htmlFor="stroke">Stroke color:</label><br/>
                <input name="stroke" value={this.getVal("stroke")} onChange={this.setVal} type="color" style={{width: "94%"}} />
                <hr/>
                <label htmlFor="strokeWidth">Stroke width:</label><br/>
                <input name="strokeWidth" value={this.getVal("strokeWidth")} onChange={this.setVal} type="number" style={{width: "94%"}} />
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
                </details>
            </div>
        )
    }
}

Menu.propTypes = {
    focusedBadgeId: PropTypes.number.isRequired,
    focusedPropName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        showMenu: state.showMenu,
        badges: state.badges,
    }
}

export default connect(mapStateToProps)(Menu);
