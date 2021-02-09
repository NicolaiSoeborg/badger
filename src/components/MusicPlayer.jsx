import React, { Component } from "react";
import { connect } from "react-redux";

class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badgerInterval: null,
            badgerTimer: 0,
        };
    }

    toggleMusic = (event) => {
        if (event.target.checked) {
            // Play badger music:
            document.getElementById("player").src = "https://www.youtube-nocookie.com/embed/hGlyFc79BUE?rel=0&controls=0&showinfo=0&enablejsapi=1&autoplay=1&origin=https://xn--sb-lka.org";

            // And log how much time has been spent:
            this.setState({
                badgerInterval: setInterval(() => {
                    this.setState({ badgerTimer: this.state.badgerTimer + 1 });
                    if (this.state.badgerTimer % 1800 === 0) {
                        this.props.dispatch({
                            type: "ADD_MSG",
                            payload: `The badger song has been running for ${this.state.badgerTimer / 60} min`,
                        });
                    }
                }, 1000)
            });
        } else {
            document.getElementById("player").src = "";  // stop music
            clearInterval(this.state.badgerInterval);  // clear timer
        }
    }

    render () {
        return (
            <>
                <span>Play music: <input type="checkbox" onChange={this.toggleMusic} /></span>
                <iframe id="player" allow="autoplay; encrypted-media" loading="eager" referrerPolicy="no-referrer"
                    className="hidden" width="0" height="0" title="badger" />
            </>
        );
    }
}

export default connect()(MusicPlayer);
