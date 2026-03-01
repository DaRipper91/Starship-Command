import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Component, ErrorInfo, ReactNode } from 'react';

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
        <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-red-900/50 bg-red-900/10 p-6 text-center">
          <AlertTriangle className="mb-4 h-10 w-10 text-red-500" />
          <h2 className="mb-2 text-lg font-bold text-red-400">
            Something went wrong
          </h2>
          <p className="mb-4 max-w-sm text-sm text-red-300/80">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 rounded bg-red-900/30 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-900/50 hover:text-white"
          >
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
