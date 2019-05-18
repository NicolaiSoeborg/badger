import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FontSelector extends Component {
    constructor(props) {
        super(props);
        const additionalWindowsFonts = (navigator.platform === 'Win32')
            ? ["Segoe Print", "Tahoma", "Terminal", "Wingdings", "Arial"] : [];
        this.state = {
            selectedFont: this.props.selectedFont || "Impact",
            // MAKE SURE TO UPDATE public/index.html when adding/removing fonts!
            fonts: [
                "Amatic SC",
                "Architects Daughter",
                "Black Ops One",
                "Clicker Script",
                "Comic Sans MS",
                "Diplomata SC",
                "Griffy",
                "Helvetica",
                "Impact",
                "Indie Flower",
                "Kaushan Script",
                "Lobster",
                "Marck Script",
                "Monoton",
                "Orbitron",
                "Permanent Marker",
                "Poiret One",
                "Righteous",
                "Roboto",
                "Satisfy",
                "Times New Roman",
                "ZCOOL KuaiLe",
                ...additionalWindowsFonts
            ],
        };
    }

    changeFont = (event) => {
        let font = event.target.value;
        if (font === "[Add new font]") {
            font = prompt("Font name:");
            if (font === null || font.length === 0) return;

            // Try loading from Google Fonts API:
            const fontLink = document.createElement("link");
            fontLink.setAttribute("rel", "stylesheet");
            fontLink.setAttribute("type", "text/css");
            fontLink.setAttribute("href", `https://fonts.googleapis.com/css?family=${font.replace(/ /g, '+')}`);
            document.getElementsByTagName("head")[0].appendChild(fontLink);

            this.setState({ fonts: [...this.state.fonts, font] });
        }
        this.setState({ selectedFont: font });
        this.props.setFont(font);
    }

    render () {
        return (<>
            <label htmlFor="fonts">Font:</label>
            <br/>
            <select
              name="fonts"
              value={this.state.selectedFont}
              style={{width: "94%"}}
              onChange={this.changeFont}
              data-intro="If you need additional fonts, you can install them on your computer and need to type the exact name of the font."
              >
                {this.state.fonts.map((name) => (
                    <option style={{fontFamily: name}} key={name}>{name}</option>
                ))}
                <option>[Add new font]</option>
            </select>
        </>)
    }
}

FontSelector.propTypes = {
    selectedFont: PropTypes.string.isRequired,
    setFont: PropTypes.func.isRequired,
};

export default FontSelector;
