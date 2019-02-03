import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ImgUpload extends Component {

    loadImage = (event) => {
        const reader = new FileReader();
        // What to do when loading of data is done:
        reader.onload = (evt) => {
            const data = evt.target.result;
            if (data.slice(5, data.indexOf(';')) === 'image/gif') {
                this.props.dispatch({ type: "ADD_MSG", payload: "WARNING: gifs might print weirdly!" })
            };
            this.props.dispatch({
                type: "BADGE_IMAGE_EDIT",
                badgeId: this.props.id,
                payload: {
                    href: data,
                }
            });
        };
        // Begin loading data (async)
        reader.readAsDataURL(event.target.files[0]);
    }

    render () {
        return <input type="file" id={`fileSelect${this.props.id}`} accept="image/*" onChange={this.loadImage} className="hidden" />
    }
}

ImgUpload.propTypes = {
    id: PropTypes.number.isRequired,
};

export default connect()(ImgUpload);
