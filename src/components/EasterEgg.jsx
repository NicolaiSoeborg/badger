import React, { Component } from "react";

// Idea by: http://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/

class EasterEgg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            eggInterval: null,
        };
    }

    youLost = (blink) => {
        clearInterval(this.state.eggInterval);
        if (blink === 0) {
            window.location.hash = "⠀YOU⠀JUST⠀WASTED⠀20⠀SEC⠀OF⠀YOUR⠀LIFE,⠀CONGRATS";
        } else if (blink % 2 === 0) {
            window.location.hash = "⠀🏆⠀".repeat(10);
        } else {
            window.location.hash = "⠀";
        }
        if (this.state.isRunning && blink > 0) {
            this.setState({
                eggInterval: setTimeout(this.youLost.bind(this, blink-1), 350)
            });
        }
    }

    forrestGump = (time) => {
        const nonNeg = n => Math.max(0, n);
        const dist = 50;

        clearInterval(this.state.eggInterval);
        if (time === dist) {
            return this.youLost(6);
        } else {
            window.location.hash = `⠀🍺🥂🍻${"⠀".repeat(nonNeg(dist - time))}🏃`;
        }
        if (this.state.isRunning) {
            this.setState({
                eggInterval: setTimeout(this.forrestGump.bind(this, time+1), 350)
            });
        }
    }

    toggleEgg = (event) => {
        this.setState({
            isRunning: event.target.checked,
        }, () => {
            if (this.state.isRunning) {
                this.forrestGump(0);
            }
        });
    }

    render () {
        return (
          <span>Easter egg: <input type="checkbox" disabled onChange={this.toggleEgg} /></span>);
    }
}

export default EasterEgg;
