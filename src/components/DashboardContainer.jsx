import React, { useState, useEffect } from 'react';
import { Search, Bell, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import GreetingClock from './GreetingClock';
import PersonalDashboard from './PersonalDashboard';
import CompanyDashboard from './CompanyDashboard';
import TransacoesPage from './TransacoesPage';
import InvestimentosPage from './InvestimentosPage';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

// Novos módulos enterprise
import SalesPage from './enterprise/SalesPage';
import UtmPage from './enterprise/UtmPage';
import MetaAdsPage from './enterprise/MetaAdsPage';
import MetasPage from './enterprise/MetasPage';
import FinanceiroEmpresaPage from './enterprise/FinanceiroEmpresaPage';
import IntegracoesPage from './enterprise/IntegracoesPage';
import CadastrosPage from './enterprise/CadastrosPage';
import AssinaturasPage from './enterprise/AssinaturasPage';
import ConfiguracoesPage from './enterprise/ConfiguracoesPage';

const LOGO_NE = '/ne-logo.png';

const DashboardContainer = () => {
  const { loading } = useApp();
  const [isCompanyMode, setIsCompanyMode] = useState(false);
  const [portalActive, setPortalActive] = useState(false);
  const [dadosVisiveis, setDadosVisiveis] = useState(true);
  const [activePage, setActivePage] = useState('overview');

  // Capture Nuvemshop token from OAuth redirect URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('nuvem_token');
    const userId = params.get('nuvem_user_id');
    if (token) {
      localStorage.setItem('nuvemshop_access_token', token);
      if (userId) localStorage.setItem('nuvemshop_user_id', userId);
      // Clean up the URL
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

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
      setActivePage('overview');
    }, 400);
    setTimeout(() => {
      setPortalActive(false);
    }, 900);
  };

  const renderPage = () => {
    // Escopo Empresa
    if (isCompanyMode) {
      switch (activePage) {
        case 'vendas': return <SalesPage oculto={!dadosVisiveis} />;
        case 'utms': return <UtmPage oculto={!dadosVisiveis} />;
        case 'meta-ads': return <MetaAdsPage oculto={!dadosVisiveis} />;
        case 'metas': return <MetasPage oculto={!dadosVisiveis} />;
        case 'financeiro': return <FinanceiroEmpresaPage oculto={!dadosVisiveis} />;
        case 'integracoes': return <IntegracoesPage oculto={!dadosVisiveis} />;
        case 'cadastros': return <CadastrosPage oculto={!dadosVisiveis} />;
        case 'assinaturas': return <AssinaturasPage oculto={!dadosVisiveis} />;
        case 'configuracoes': return <ConfiguracoesPage oculto={!dadosVisiveis} />;
        case 'transacoes-empresa': return <TransacoesPage escopo="empresa" oculto={!dadosVisiveis} />;
        case 'investimentos-empresa': return <InvestimentosPage escopo="empresa" oculto={!dadosVisiveis} />;
        default: return <CompanyDashboard oculto={!dadosVisiveis} />;
      }
    }

    // Escopo Pessoal
    if (activePage === 'transacoes') {
      return <TransacoesPage escopo="pessoal" oculto={!dadosVisiveis} />;
    }
    if (activePage === 'investimentos') {
      return <InvestimentosPage oculto={!dadosVisiveis} />;
    }
    return <PersonalDashboard oculto={!dadosVisiveis} />;
  };

  if (loading) {
    return (
      <div className="flex-center flex-column" style={{ height: '100vh', width: '100vw' }}>
        <Loader2 className="animate-spin" size={48} color="var(--color-primary)" />
        <p className="text-muted">Carregando seus dados...</p>
      </div>
    );
  }


  return (
    <div className="app-layout">
      {/* PORTAL OVERLAY */}
      <div className="portal-overlay">
        <div className={`portal-circle ${portalActive ? 'expanding' : ''} ${isCompanyMode && portalActive ? 'reverse' : ''}`} />
      </div>

      <Sidebar isCompanyMode={isCompanyMode} activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <header className="topbar">
          <GreetingClock />
          
          <div className="topbar-right">
            <button
              onClick={() => setDadosVisiveis(!dadosVisiveis)}
              className="btn-premium btn-ocultar"
            >
              {dadosVisiveis ? <Eye size={16} /> : <EyeOff size={16} />}
              <span>Ocultar</span>
            </button>

            <button className="icon-btn-circle"><Search size={18} /></button>
            <button className="icon-btn-circle"><Bell size={18} /></button>

            <button 
              className="btn-mode-switcher"
              onClick={triggerPortal}
            >
              <div className="mode-icon-box">
                {isCompanyMode ? <Eye size={14} /> : <img src="/ne-logo.png" alt="" />}
              </div>
              <span className="mode-label">
                {isCompanyMode ? 'Pessoal' : 'Empresa'}
              </span>
            </button>

            <div className="profile-btn">L</div>
          </div>
        </header>

        {renderPage()}
      </main>


      <BottomNav activePage={activePage} setActivePage={setActivePage} isCompanyMode={isCompanyMode} />
    </div>
  );
};

export default DashboardContainer;
