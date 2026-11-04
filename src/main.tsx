import React, { Component, ErrorInfo, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeEmailJS } from "./services/emailService";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", color: "#f87171", backgroundColor: "#0f172a", fontFamily: "monospace", minHeight: "100vh" }}>
          <h2 style={{ fontSize: "24px", color: "#ef4444", marginBottom: "16px" }}>⚠️ Runtime Error Caught</h2>
          <pre style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", overflowX: "auto", color: "#fca5a5" }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", overflowX: "auto", marginTop: "16px", fontSize: "12px", color: "#94a3b8" }}>
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize EmailJS with client public key
initializeEmailJS();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);
