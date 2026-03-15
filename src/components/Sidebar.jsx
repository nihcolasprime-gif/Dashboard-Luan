import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, PieChart, LogOut } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'transacoes', label: 'Transações', icon: Wallet },
  { id: 'investimentos', label: 'Investimentos', icon: TrendingUp },
  { id: 'relatorios', label: 'Relatórios', icon: PieChart },
];

const Sidebar = ({ isCompanyMode, toggleMode }) => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          {isCompanyMode ? 'NE' : 'L'}
        </div>
        <div className="logo-text">
          {isCompanyMode ? 'Nação' : 'Financeiro'}
          <span>{isCompanyMode ? 'ESPORTES' : 'PESSOAL'}</span>
        </div>
      </div>

      <nav className="nav-menu">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={`nav-item ${item.id === 'overview' ? 'active' : ''}`}>
              <Icon size={20} />
              {item.label}
            </div>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
        <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
          luan@email.com
        </p>
        <button
          className="btn-outline flex-center"
          style={{ width: '100%', gap: '0.5rem', padding: '0.625rem 1rem', fontSize: '0.875rem' }}
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
