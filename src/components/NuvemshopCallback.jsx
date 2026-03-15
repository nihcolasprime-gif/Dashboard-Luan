import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

const NuvemshopCallback = () => {
  const [status, setStatus] = useState('loading');
  const [tokenData, setTokenData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      setStatus('error');
      setErrorMessage('Código de autorização não encontrado na URL.');
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            client_id: import.meta.env.VITE_NUVEMSHOP_APP_ID || "27805",
            client_secret: import.meta.env.VITE_NUVEMSHOP_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error_description || data.error || 'Erro ao gerar token');
        }

        setTokenData(data);
        setStatus('success');
        
        // Save to localStorage so it's persisted for the frontend
        localStorage.setItem('nuvemshop_access_token', data.access_token);
        localStorage.setItem('nuvemshop_user_id', data.user_id);

      } catch (err) {
        console.error('Erro de autorização Nuvemshop:', err);
        setStatus('error');
        setErrorMessage(err.message);
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="flex-center flex-column" style={{ height: '100vh', width: '100vw', padding: 'var(--space-xl)' }}>
      {status === 'loading' && (
        <>
          <Loader2 className="animate-spin" size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--color-text)' }}>Conectando com a Nação Dados...</h2>
          <p className="text-muted">Aguarde, estamos gerando sua chave de acesso segura.</p>
        </>
      )}

      {status === 'success' && tokenData && (
        <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>Conexão Realizada com Sucesso!</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            Seu Access Token foi gerado e salvo com sucesso. Agora a Nação Dados já tem acesso aos seus pedidos e produtos!
          </p>
          
          <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ACCESS_TOKEN Salvo:</p>
            <strong style={{ display: 'block', wordBreak: 'break-all', marginTop: '4px', color: 'var(--color-primary)' }}>
              {tokenData.access_token}
            </strong>
          </div>

          <button className="btn-premium btn-primary" onClick={() => window.location.href = '/'}>
            Acessar Meu Dashboard
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <XCircle size={48} color="var(--color-danger)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>Falha na Conexão</h2>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>
            Ocorreu um erro ao tentar gerar o token de acesso. O código de autorização pode ter expirado.
          </p>
          <div style={{ background: 'rgba(255, 59, 48, 0.1)', color: 'var(--color-danger)', padding: '1rem', borderRadius: '8px', fontSize: '0.875rem' }}>
            {errorMessage}
          </div>
          <button className="btn-premium btn-outline" style={{ marginTop: '2rem' }} onClick={() => window.location.href = '/'}>
            Voltar ao Início
          </button>
        </div>
      )}
    </div>
  );
};

export default NuvemshopCallback;
