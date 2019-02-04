import React, { Component } from 'react';
import { load } from 'webfontloader';

const FONTS = [
    "Amatic SC",
    "Architects Daughter",
    "Arial",
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
    "Segoe Print",
    "Tahoma",
    "Terminal",
    "Times New Roman",
    "Wingdings",
    "ZCOOL KuaiLe",
];

// Load web fonts from Google Font API
load({
    google: {
        families: FONTS
    },
    timeout: 8000 // plenty of time!
});

/*const canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    text = "abcdefghijklmnopqrstuvwxyz0123456789";
context.font = "72px monospace";
const baselineSize = context.measureText(text).width;*/

class FontSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFont: this.props.selectedFont || "Impact",
            fonts: [...FONTS],
        };
        this.changeFont = this.changeFont.bind(this);
    }

    /*doesFontExist = (fontName) => {
        // Modified from https://gist.github.com/alloyking/4154494

        // Specifying the font whose existence we want to check
        context.font = "72px '" + fontName + "', monospace";

        // Checking the size of the font we want to check
        const newSize = context.measureText(text).width;

        // If the size of the two text instances is the same, the font does not exist because it is being rendered
        // using the default sans-serif font
        return (newSize !== baselineSize);
    }*/

    changeFont = (event) => {
        let font = event.target.value;
        if (font === "[Add new font]") {
            font = prompt("Font name:");
            
            /*
            // TODO THIS DOESNT WORK (trying to load font from "Google Font")
            load({
                google: { families: [font] },
                loading: function() { console.log("loading") },
                inactive: function() { console.log("BAAAAD") },
            });
            
            /*if (!this.doesFontExist(font)) {
                alert(`Seems like the font "${font}" doesn't exist.`);
                return;
            }*/
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
              >
                {this.state.fonts/*.filter(this.doesFontExist)*/.map((name) => (
                    <option style={{fontFamily: name}} key={name}>{name}</option>
                ))}
                <option>[Add new font]</option>
            </select>
        </>)
    }
}

export default FontSelector;
