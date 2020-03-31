import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false
    };
  }

  // catches any error ahead of time thrown in any children
  static getDerivedStateFromError(error) {
    // process error
    return { hasErrored: true }; // an object representing the new state
  }

  // the error and the info, like which component throw the error
  componentDidCatch(error, info) {
    // process error
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/lKJiT77.png" />
          <ErrorImageText>
            My dog ate this page... I am sooooo sorry! What a bad boy!
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
