import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-10">
          <div className="max-w-2xl w-full glass p-8 border-red-500/50">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Frontend Error</h1>
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto text-xs text-red-400 mb-6">
              {this.state.error?.toString()}
              {"\n"}
              {this.state.error?.stack}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
