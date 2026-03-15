import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, ShoppingBag, PieChart, Menu, X } from 'lucide-react';

const BottomNav = ({ activePage, setActivePage, isCompanyMode }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const personalItems = [
    { id: 'overview', label: 'Início', icon: LayoutDashboard },
    { id: 'transacoes', label: 'Extrato', icon: Wallet },
    { id: 'investimentos', label: 'Investir', icon: TrendingUp },
  ];

  const companyItems = [
    { id: 'overview', label: 'Painel', icon: LayoutDashboard },
    { id: 'vendas', label: 'Vendas', icon: ShoppingBag },
    { id: 'financeiro', label: 'Finanças', icon: PieChart },
  ];

  // All 10 modules for the expanded menu
  const allCompanyItems = [
    { id: 'overview', label: 'Painel' },
    { id: 'vendas', label: 'Vendas' },
    { id: 'utms', label: 'UTMs' },
    { id: 'meta-ads', label: 'Meta Ads' },
    { id: 'metas', label: 'Metas' },
    { id: 'financeiro', label: 'Financeiro' },
    { id: 'integracoes', label: 'Integrações' },
    { id: 'cadastros', label: 'Cadastros' },
    { id: 'assinaturas', label: 'Assinaturas' },
    { id: 'configuracoes', label: 'Ajustes' },
  ];

  const items = isCompanyMode ? companyItems : personalItems;

  return (
    <>
      {/* EXPANDED MENU OVERLAY */}
      {menuOpen && (
        <div className="modal-overlay menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="glass-panel expanded-menu">
            <h3 className="menu-title">Todos os Módulos</h3>
            <div className="menu-grid">
              {allCompanyItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMenuOpen(false); }}
                  className={`menu-btn ${activePage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}


      <nav className="bottom-nav">

        {items.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`bottom-nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </div>
          );
        })}
        {isCompanyMode && (
          <div className="bottom-nav-item" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
            <span>Mais</span>
          </div>
        )}
      </nav>
    </>
  );
};

export default BottomNav;
