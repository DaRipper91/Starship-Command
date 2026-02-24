import { AlertTriangle, RefreshCcw } from 'lucide-react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 p-8 text-center text-gray-200">
          <div className="mb-4 rounded-full bg-red-900/30 p-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
          <p className="mb-6 max-w-md text-sm text-gray-400">
            {this.state.error?.message ||
              'An unexpected error occurred while rendering the interface.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCcw size={16} />
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
