import React, { Component } from "react";

const EXAMPLES = [
    "Awesome_badge.pdf",
    "bildsoeskov17.pdf",
    "C-BYG.pdf",
    "Fail_badge.pdf",
    "lucyfar.doc",
    "Medico.pdf",
    "NetIT.pdf",
    "PandK.doc",
    "Scor_badge.pdf",
    "UK_pepe.png",
    "Wrapsere.pdf",
];

class Examples extends Component {
    constructor(props) {
        super(props);
        // this.state = { };
    }

    badge2div = (filename) => {
        const download = "/static/badges/" + filename;
        const template = download + "-template.png";
        return (<div key={filename} style={{textAlign: "center"}}>
            <hr />
            <img src={template} width="300" alt="Example badge design}" />
            <a href={download}><h2>{filename}</h2></a>
        </div>);
    }

    render () {
        return (
              <div className="no-print"
              style={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  maxWidth: 600,
                  minHeight: 300,
                  margin: "0 auto",
                  padding: 30
              }}>
                <button className="closeBtn" onClick={this.props.onClose}>X</button>
                <h1>Examples</h1>
                <p>
                    The following is a small list of some old badge designs that you are free to reuse.
                    You should also checkout the <a href="https://studiestartswiki.pf.dk/rusturen:badges">Study start wiki</a>.
                </p>
                <p><strong>Note:</strong> Unfortunally I haven't saved the background images, so the following list can mostly be used as inspiration for new badge designs.
                If you make a super nice badge, then please keep the original background image and send it to <a href="mailto:badger@xn--sb-lka.org">badger@søb.org</a>, then next year it will be even easier to badge!</p>

                {EXAMPLES.map(this.badge2div)}
              </div>
        );
    }
}

export default Examples;
