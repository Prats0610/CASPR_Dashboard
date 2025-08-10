import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
  onReset?: () => void;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-xl mx-auto mt-10 bg-white dark:bg-slate-800 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            An unexpected error occurred while rendering this page.
          </p>
          {import.meta.env.MODE !== "production" && this.state.error && (
            <pre className="text-xs overflow-auto p-3 rounded bg-slate-100 dark:bg-slate-700 dark:text-white mb-4">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex gap-2">
            <button
              onClick={this.handleReset}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.assign("/")}
              className="px-3 py-2 border rounded bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600"
            >
              Go home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
