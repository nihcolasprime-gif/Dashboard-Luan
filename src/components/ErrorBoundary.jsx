import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Dashboard render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            gap: '1rem',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ fontSize: '2rem' }}>⚠️</div>
          <h3 style={{ color: 'var(--color-text)' }}>Algo deu errado nessa página</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            {this.state.error?.message || 'Erro desconhecido'}
          </p>
          <button
            className="btn-outline"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
