import { Component } from "react";
import PropTypes from "prop-types";


// ErrorBoundary component to catch errors in the child components
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to display the fallback UI
    return { hasError: true };
  }

  // // Implement componentDidCatch if needed
  // componentDidCatch(error, errorInfo) {
  //   // Log the error to an error reporting service if needed
  //   console.error("Error caught by ErrorBoundary:", error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
