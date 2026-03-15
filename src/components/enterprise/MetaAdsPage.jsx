import React, { useState } from 'react';
import { Facebook, Instagram, TrendingUp, DollarSign, MousePointer2, Eye, LayoutGrid, Layers, Monitor } from 'lucide-react';

const MetaAdsPage = ({ oculto }) => {
  const [activeSubTab, setActiveSubTab] = useState('campanhas');
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const campaignStats = [
    { name: 'Conversão Direta - Verão', reach: '1.2M', ctr: '1.85%', cpc: 'R$ 0,45', spent: 'R$ 15.000', roas: '6.2x' },
    { name: 'Remarketing Dinâmico', reach: '450k', ctr: '3.20%', cpc: 'R$ 0,85', spent: 'R$ 8.000', roas: '4.5x' },
    { name: 'Branding - Nação Esportes', reach: '5.8M', ctr: '0.90%', cpc: 'R$ 0,30', spent: 'R$ 20.000', roas: '1.2x' },
  ];

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
          <div className="value">4.85x</div>
          <div className="sub-value success">Dentro da meta otimizada</div>
          <div className="icon-box"><TrendingUp size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Investimento (Mensal)</div>
          <div className="value">R$ 43.000,00</div>
          <div className="sub-value">Orçamento: R$ 50.000,00</div>
          <div className="icon-box"><DollarSign size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">CTR Médio</div>
          <div className="value">1.42%</div>
          <div className="sub-value">+0.2% vs semana passada</div>
          <div className="icon-box"><MousePointer2 size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Alcance Único</div>
          <div className="value">7.5M</div>
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
              {campaignStats.map((c, idx) => (
                <tr key={idx}>
                  <td className="main-value">{c.name}</td>
                  <td>{c.reach}</td>
                  <td>{c.ctr}</td>
                  <td>{c.cpc}</td>
                  <td>{c.spent}</td>
                  <td className="highlight success">{c.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default MetaAdsPage;
