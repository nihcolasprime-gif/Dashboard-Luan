import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Eye, EyeOff } from 'lucide-react';
import GreetingClock from './GreetingClock';
import PersonalDashboard from './PersonalDashboard';
import CompanyDashboard from './CompanyDashboard';
import Sidebar from './Sidebar';

// Use the logo the user provided
const LOGO_NE = '/ne-logo.png';

const DashboardContainer = () => {
  const [isCompanyMode, setIsCompanyMode] = useState(false);
  const [portalActive, setPortalActive] = useState(false);
  const [dadosVisiveis, setDadosVisiveis] = useState(true);
  const portalRef = useRef(null);

  useEffect(() => {
    if (isCompanyMode) {
      document.body.setAttribute('data-theme', 'company');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isCompanyMode]);

  const triggerPortal = () => {
    setPortalActive(true);
    setTimeout(() => {
      setIsCompanyMode(prev => !prev);
    }, 400);
    setTimeout(() => {
      setPortalActive(false);
    }, 900);
  };

  return (
    <div className="app-layout">
      {/* PORTAL OVERLAY */}
      <div className="portal-overlay">
        <div
          ref={portalRef}
          className={`portal-circle ${portalActive ? 'expanding' : ''} ${isCompanyMode && portalActive ? 'reverse' : ''}`}
        />
      </div>

      <Sidebar isCompanyMode={isCompanyMode} />

      <main className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <GreetingClock />

          <div className="topbar-right">
            <button
              onClick={() => setDadosVisiveis(!dadosVisiveis)}
              className="btn-outline flex-center"
              style={{ gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem' }}
            >
              {dadosVisiveis ? <Eye size={18} /> : <EyeOff size={18} />}
              {dadosVisiveis ? 'Ocultar Valores' : 'Mostrar Valores'}
            </button>

            <button className="icon-btn" title="Buscar"><Search size={18} /></button>
            <button className="icon-btn" title="Notificações"><Bell size={18} /></button>

            {/* PORTAL TRIGGER - Nação Esportes Logo */}
            <div className="portal-trigger" onClick={triggerPortal} title="Alternar para Dashboard da Empresa">
              {isCompanyMode ? (
                <>
                  <span>👤</span>
                  <span style={{ fontSize: '0.85rem' }}>Pessoal</span>
                </>
              ) : (
                <>
                  <img src={LOGO_NE} alt="Nação Esportes" onError={(e) => { e.target.style.display = 'none'; }} />
                  <span style={{ fontSize: '0.85rem' }}>Empresa</span>
                </>
              )}
            </div>

            <div className="profile-btn">L</div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        {isCompanyMode ? (
          <CompanyDashboard oculto={!dadosVisiveis} />
        ) : (
          <PersonalDashboard oculto={!dadosVisiveis} />
        )}
      </main>
    </div>
  );
};

export default DashboardContainer;
