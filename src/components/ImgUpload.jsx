import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ACTIONS } from "../Constants";

class ImgUpload extends Component {

    loadImage = (event) => {
        const reader = new FileReader();
        // What to do when loading of data is done:
        reader.onload = (evt) => {
            const data = evt.target.result;
            if (typeof data == "string" && data.slice(5, data.indexOf(";")) === "image/gif") {
                this.props.dispatch({ type: ACTIONS.ADD_MSG, payload: "WARNING: gifs might print weirdly!" });
            }
            this.props.dispatch({
                type: ACTIONS.BADGE_IMAGE_EDIT,
                badgeId: this.props.id,
                payload: {
                    href: data,
                }
            });
        };
        
        try {
            // Begin loading data (async) if exactly one file is selected
            if (event.target.files.length === 1)
                reader.readAsDataURL(event.target.files[0]);
        } catch (err) {
            console.warn(err);
            this.props.dispatch({ type: ACTIONS.ADD_MSG, payload: `Error while loading image: ${err}` });
        }
    }

    render () {
        return <input type="file" id={`fileSelect${this.props.id}`} accept="image/*" onChange={this.loadImage} className="hidden" />;
    }
}

ImgUpload.propTypes = {
    id: PropTypes.number.isRequired,
};

export default connect()(ImgUpload);
