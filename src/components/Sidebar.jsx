import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Link2, 
  Facebook, 
  Target, 
  PieChart, 
  RefreshCw, 
  Users, 
  CreditCard, 
  Settings,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, isCompanyMode }) => {
  
  const companyMenu = [
    { id: 'overview', label: 'Painel', icon: LayoutDashboard },
    { id: 'vendas', label: 'Vendas', icon: ShoppingBag },
    { id: 'utms', label: 'UTMs', icon: Link2 },
    { id: 'meta-ads', label: 'Meta Anúncios', icon: Facebook },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'financeiro', label: 'Financeiro', icon: PieChart },
    { id: 'integracoes', label: 'Integrações', icon: RefreshCw },
    { id: 'cadastros', label: 'Cadastros', icon: Users },
    { id: 'assinaturas', label: 'Assinaturas', icon: CreditCard },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const personalMenu = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'transacoes', label: 'Transações', icon: PieChart },
    { id: 'investimentos', label: 'Investimentos', icon: Target },
  ];

  const menu = isCompanyMode ? companyMenu : personalMenu;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {isCompanyMode ? (
          <div className="logo-container">
            <div className="logo-box">
              <img src="/ne-logo.png" alt="NE Logo" />
            </div>
            <span className="brand-name">Nação Esportes</span>
          </div>
        ) : (
          <div className="logo-container">
            <div className="profile-avatar">L</div>
            <div className="flex-column" style={{ gap: 0 }}>
              <span className="sidebar-title">Financeiro</span>
              <span className="sidebar-subtitle">PESSOAL</span>
            </div>
          </div>
        )}
      </div>


      <nav className="sidebar-nav">
        {menu.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <div className="item-content">
              <item.icon size={18} />
              <span className="label">{item.label}</span>
            </div>
            {activePage === item.id && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>


      <div className="sidebar-footer">
        <p className="user-email">luan@email.com</p>
        <button className="btn-premium btn-logout">
          <RefreshCw size={16} />
          <span>Sair</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
