import React, { useState } from 'react';
import { Link2, LayoutGrid, FileText, PlusCircle, Copy } from 'lucide-react';

const UtmPage = ({ oculto }) => {
  const [activeTab, setActiveTab] = useState('relatorio');
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const relatorioData = [
    { campaign: 'campanha_verao_24', source: 'facebook', medium: 'cpc', sales: 12, cpa: 'R$ 12,50', spend: 'R$ 150,00', rev: 'R$ 1.200,00', roas: '8.0x' },
    { campaign: 'google_search_brand', source: 'google', medium: 'search', sales: 8, cpa: 'R$ 8,20', spend: 'R$ 65,60', rev: 'R$ 840,00', roas: '12.8x' },
    { campaign: 'newsletter_mar_launch', source: 'email', medium: 'newsletter', sales: 4, cpa: 'R$ 0,00', spend: 'R$ 0,00', rev: 'R$ 540,00', roas: '∞' },
  ];

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>UTMs</h2>
        <div className="tab-switcher glass-panel" style={{ padding: '0.25rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`tab-btn ${activeTab === 'relatorio' ? 'active' : ''}`}
            onClick={() => setActiveTab('relatorio')}
          >
            <FileText size={16} /> Relatório
          </button>
          <button 
            className={`tab-btn ${activeTab === 'gerador' ? 'active' : ''}`}
            onClick={() => setActiveTab('gerador')}
          >
            <PlusCircle size={16} /> Gerador
          </button>
        </div>
      </div>

      {activeTab === 'relatorio' ? (
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', ...blurStyle }}>
          <div className="wintrack-table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="wintrack-table">
              <thead>
                <tr>
                  <th>Campanha</th>
                  <th>Source</th>
                  <th>Medium</th>
                  <th>Vendas</th>
                  <th>CPA</th>
                  <th>Gasto</th>
                  <th>Receita</th>
                  <th>ROAS</th>
                </tr>
              </thead>
              <tbody>
                {relatorioData.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.campaign}</td>
                    <td><span className="status-badge" style={{ background: 'rgba(226, 176, 83, 0.1)' }}>{d.source}</span></td>
                    <td className="text-muted">{d.medium}</td>
                    <td>{d.sales}</td>
                    <td>{d.cpa}</td>
                    <td>{d.spend}</td>
                    <td style={{ fontWeight: 600 }}>{d.rev}</td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{d.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', ...blurStyle }}>
          <h3 style={{ marginBottom: '2rem' }}>Gerador de Link UTM</h3>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="input-group">
              <label>URL Original do Site</label>
              <input type="text" placeholder="https://nacaoesportes.com.br/produto-exemplo" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label>Origem (UTM Source)</label>
                <input type="text" placeholder="ex: facebook, google" />
              </div>
              <div className="input-group">
                <label>Mídia (UTM Medium)</label>
                <input type="text" placeholder="ex: cpc, email" />
              </div>
            </div>
            <div className="input-group">
              <label>Nome da Campanha (UTM Campaign)</label>
              <input type="text" placeholder="ex: lancamento_inverno_24" />
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Link Gerado:</div>
              <div style={{ wordBreak: 'break-all', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                https://nacaoesportes.com.br/produto-exemplo?utm_source=...&utm_medium=...
              </div>
              <button className="btn-outline flex-center" style={{ marginTop: '1rem', width: '100%', gap: '0.5rem' }}>
                <Copy size={16} /> Copiar Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtmPage;
