'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
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
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="glass-card max-w-md w-full p-8 rounded-xl border border-error/20 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-error" />
            </div>
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">System Anomaly Detected</h2>
            <p className="text-on-surface-variant mb-6 text-sm">
              {this.state.error?.message || 'An unexpected error occurred in the application.'}
            </p>
            <button
              className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Attempt Recovery
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
