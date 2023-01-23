import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        console.warn(`componentDidCatch(${error}, ${info})`);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <div className="no-print">ERROR: This component can't be rendered, sorry about that</div>;
        }
        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;