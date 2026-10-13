"use client";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: "2rem",
              margin: "1rem auto",
              maxWidth: 520,
              textAlign: "center",
              background: "rgba(255,107,107,0.06)",
              border: "1px solid rgba(255,107,107,0.2)",
              borderRadius: 12,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>⚠️</div>
            Something went wrong loading this section.
            <br />
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1.2rem",
                borderRadius: 8,
                border: "1px solid rgba(214,51,132,0.3)",
                background: "rgba(214,51,132,0.1)",
                color: "#f5a9b8",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
