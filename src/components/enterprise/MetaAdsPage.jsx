import React, { useState } from 'react';
import { Facebook, Instagram, TrendingUp, DollarSign, MousePointer2, Eye, LayoutGrid, Layers, Monitor } from 'lucide-react';

const MetaAdsPage = ({ oculto }) => {
  const [activeSubTab, setActiveSubTab] = useState('campanhas');
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const campaignStats = [];

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="dashboard-hero enterprise-header">
        <h1 className="hero-title">Meta Anúncios</h1>
        <div className="tab-switcher glass-panel premium-tabs">
          <button 
            className={`tab-btn ${activeSubTab === 'campanhas' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('campanhas')}
          >
            <LayoutGrid size={16} /> Campanhas
          </button>
          <button 
            className={`tab-btn ${activeSubTab === 'conjuntos' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('conjuntos')}
          >
            <Layers size={16} /> Conjuntos
          </button>
          <button 
            className={`tab-btn ${activeSubTab === 'anuncios' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('anuncios')}
          >
            <Monitor size={16} /> Anúncios
          </button>
        </div>
      </div>


      <div className="wintrack-kpi-grid" style={blurStyle}>
        <div className="wintrack-card gold-border glass-panel">
          <div className="label">ROAS Médio</div>
          <div className="value">0.00x</div>
          <div className="sub-value success">-</div>
          <div className="icon-box"><TrendingUp size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Investimento (Mensal)</div>
          <div className="value">R$ 0,00</div>
          <div className="sub-value">Orçamento: -</div>
          <div className="icon-box"><DollarSign size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">CTR Médio</div>
          <div className="value">0.00%</div>
          <div className="sub-value">-</div>
          <div className="icon-box"><MousePointer2 size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Alcance Único</div>
          <div className="value">0</div>
          <div className="sub-value">Pessoas impactadas</div>
          <div className="icon-box"><Eye size={20} /></div>
        </div>
      </div>


      <div className="glass-panel section-panel" style={blurStyle}>
        <div className="flex-between header-row">
          <h3>Campanhas Ativas</h3>
        </div>
        <div className="wintrack-table-container">
          <table className="wintrack-table">
            <thead>
              <tr>
                <th>Campanha</th>
                <th>Alcance</th>
                <th>CTR</th>
                <th>CPC</th>
                <th>Gasto</th>
                <th>ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaignStats.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">
                    Ainda não há campanhas ativas.
                  </td>
                </tr>
              ) : (
                campaignStats.map((c, idx) => (
                  <tr key={idx}>
                    <td className="main-value">{c.name}</td>
                    <td>{c.reach}</td>
                    <td>{c.ctr}</td>
                    <td>{c.cpc}</td>
                    <td>{c.spent}</td>
                    <td className="highlight success">{c.roas}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default MetaAdsPage;
