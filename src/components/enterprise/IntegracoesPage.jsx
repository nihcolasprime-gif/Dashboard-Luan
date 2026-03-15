import React from 'react';
import { Link2, RefreshCw, CheckCircle2, AlertCircle, ShoppingCart, Facebook, Globe } from 'lucide-react';
import { NuvemshopService } from '../../services/NuvemshopService';

const IntegracoesPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const handleNuvemshopConnect = () => {
    window.location.href = NuvemshopService.getAuthUrl();
  };

  const integrations = [
    { name: 'Nuvemshop', status: 'desconectado', icon: ShoppingCart, desc: 'Sincronize vendas, produtos e estoque automaticamente.' },
    { name: 'Meta Ads Manager', status: 'conectado', icon: Facebook, desc: 'Acompanhe ROAS, CPC e performance das campanhas em tempo real.' },
    { name: 'Google Analytics 4', status: 'conectado', icon: Globe, desc: 'Análise completa de tráfego, UTMs e comportamento do usuário.' },
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
              onClick={int.name === 'Nuvemshop' ? handleNuvemshopConnect : undefined}
            >
              {int.status === 'conectado' ? 'Configurar' : 'Conectar Agora'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegracoesPage;
