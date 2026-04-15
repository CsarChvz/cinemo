'use client';


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#0f0f0f',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#fff',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1
            style={{ fontSize: '4rem', margin: '0 0 0.5rem', color: '#e03131' }}
          >
            500
          </h1>
          <h2
            style={{ fontSize: '1.5rem', margin: '0 0 1rem', fontWeight: 500 }}
          >
            Algo salió mal
          </h2>
          <p style={{ color: '#aaa', margin: '0 0 2rem', fontSize: '0.95rem' }}>
            {error?.message ?? 'Error inesperado en la aplicación.'}
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.6rem 1.5rem',
              background: '#e03131',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
