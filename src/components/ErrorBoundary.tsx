import { AlertTriangle } from 'lucide-react';
import React from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white"
      role="alert"
    >
      <div className="flex flex-col items-center gap-4 rounded-lg border border-red-800 bg-red-900/20 p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="max-w-md text-red-300">
          An unexpected error occurred. You can try refreshing the application.
        </p>
        <pre className="mt-2 w-full max-w-md overflow-auto rounded bg-black/30 p-4 text-left text-xs text-red-200">
          {(error as Error).message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 rounded bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-500"
        >
          Refresh Application
        </button>
      </div>
    </div>
  );
}

const CustomErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export { CustomErrorBoundary as ErrorBoundary };
