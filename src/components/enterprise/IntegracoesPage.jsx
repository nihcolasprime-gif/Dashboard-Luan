import React, { useState } from 'react';
import { Link2, RefreshCw, CheckCircle2, AlertCircle, ShoppingCart, Facebook, Globe, X, Key, KeyRound, ToggleRight, ToggleLeft } from 'lucide-react';
import { NuvemshopService } from '../../services/NuvemshopService';

const IntegracoesPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [nuvemshopStatus, setNuvemshopStatus] = useState('desconectado');
  const [nuvemAppId, setNuvemAppId] = useState(import.meta.env.VITE_NUVEMSHOP_APP_ID || '');
  const [nuvemSecret, setNuvemSecret] = useState(import.meta.env.VITE_NUVEMSHOP_CLIENT_SECRET || '');
  const [syncStock, setSyncStock] = useState(true);
  const [syncOrders, setSyncOrders] = useState(true);

  const handleNuvemshopClick = () => {
    setIsConfigOpen(true);
  };

  const handleSaveConfig = () => {
    if (nuvemAppId && nuvemSecret) {
      setNuvemshopStatus('conectado');
    }
    setIsConfigOpen(false);
  };

  const integrations = [
    { name: 'Nuvemshop', status: nuvemshopStatus, icon: ShoppingCart, desc: 'Sincronize vendas, produtos e estoque automaticamente.' },
    { name: 'Meta Ads Manager', status: 'desconectado', icon: Facebook, desc: 'Acompanhe ROAS, CPC e performance das campanhas em tempo real.' },
    { name: 'Google Analytics 4', status: 'desconectado', icon: Globe, desc: 'Análise completa de tráfego, UTMs e comportamento do usuário.' },
    { name: 'RD Station CRM', status: 'desconectado', icon: Link2, desc: 'Envie seus leads e vendas diretamente para o funil do CRM.' },
  ];

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Hub de Integrações</h2>
        <button className="btn-outline flex-center" style={{ gap: '0.5rem' }}>
          <RefreshCw size={18} /> Sincronizar Tudo
        </button>
      </div>

      <div className="overview-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', ...blurStyle }}>
        {integrations.map((int, i) => (
          <div key={i} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="flex-between">
              <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start' }}>
                <div className="icon-box" style={{ width: '48px', height: '48px', position: 'relative' }}>
                  <int.icon size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{int.name}</h4>
                  <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.4rem', marginTop: '0.2rem' }}>
                    {int.status === 'conectado' ? <CheckCircle2 size={12} color="var(--color-success)" /> : <AlertCircle size={12} color="var(--color-warning)" />}
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: int.status === 'conectado' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                      {int.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted" style={{ fontSize: '0.85rem', flex: 1 }}>{int.desc}</p>

            <button 
              className={int.status === 'conectado' ? 'btn-outline' : 'btn-primary'} 
              style={{ width: '100%', borderRadius: '12px', background: int.status === 'conectado' ? 'transparent' : 'var(--color-primary)', color: int.status === 'conectado' ? 'var(--color-primary)' : '#0d1b3e' }}
              onClick={int.name === 'Nuvemshop' ? handleNuvemshopClick : undefined}
            >
              {int.status === 'conectado' ? 'Configurar' : 'Conectar Agora'}
            </button>
          </div>
        ))}
      </div>

      {/* Nuvemshop Config Modal */}
      {isConfigOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ maxWidth: '500px' }}>
            <div className="flex-between header-row" style={{ marginBottom: '1.5rem' }}>
              <div className="flex-center" style={{ gap: '0.8rem' }}>
                <div className="icon-box" style={{ background: 'var(--color-primary)', color: '#0d1b3e' }}><ShoppingCart size={20} /></div>
                <h3 style={{ margin: 0 }}>Integração Nuvemshop</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsConfigOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>App ID da Nuvemshop</label>
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  type="text" 
                  value={nuvemAppId}
                  onChange={(e) => setNuvemAppId(e.target.value)}
                  placeholder="Ex: 123456" 
                  style={{ paddingLeft: '2.5rem', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Client Secret</label>
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <KeyRound size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  type="password" 
                  value={nuvemSecret}
                  onChange={(e) => setNuvemSecret(e.target.value)}
                  placeholder="Insira sua chave secreta" 
                  style={{ paddingLeft: '2.5rem', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <h4 style={{ marginBottom: '1rem', fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Configurações de Sincronização</h4>
            
            <div className="flex-between" style={{ marginBottom: '1rem', padding: '0.5rem 0' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Catálogo e Estoque</strong>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>Atualizar produtos e saldo na Nuvemshop</span>
              </div>
              <button 
                className="icon-btn" 
                style={{ border: 'none', background: 'transparent', color: syncStock ? 'var(--color-success)' : 'var(--color-text-muted)', padding: 0 }}
                onClick={() => setSyncStock(!syncStock)}
              >
                {syncStock ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>

            <div className="flex-between" style={{ marginBottom: '2rem', padding: '0.5rem 0' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Importar Pedidos (Webhooks)</strong>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>Receber vendas automaticamente no ERP</span>
              </div>
              <button 
                className="icon-btn" 
                style={{ border: 'none', background: 'transparent', color: syncOrders ? 'var(--color-success)' : 'var(--color-text-muted)', padding: 0 }}
                onClick={() => setSyncOrders(!syncOrders)}
              >
                {syncOrders ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>

            <div className="flex-between" style={{ marginTop: '1rem' }}>
              <button className="btn-outline" onClick={() => setIsConfigOpen(false)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSaveConfig} style={{ background: 'var(--color-primary)', color: '#0d1b3e' }}>
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default IntegracoesPage;
