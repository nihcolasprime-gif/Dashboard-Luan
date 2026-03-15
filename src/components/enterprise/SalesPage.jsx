import React from 'react';
import { ShoppingBag, TrendingUp, Package, ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';

const SalesPage = ({ oculto }) => {
  const blurClass = oculto ? 'data-hidden' : '';

  const stats = [
    { label: 'Total de Vendas', value: '36', change: '+2', isPositive: true },
    { label: 'Faturamento Total', value: 'R$ 8.190,26', change: '+15%', isPositive: true },
    { label: 'Ticket Médio', value: 'R$ 234,01', change: '+5%', isPositive: true },
    { label: 'Margem Média', value: '100.0%', change: 'Estável', isPositive: true },
  ];

  const recentOrders = [
    { id: '#6578923', date: '15/03/2026 14:20', pag: 'Pago', env: 'Não Enviado', val: 'R$ 259,90', cost: 'R$ 120,00', profit: 'R$ 139,90', margin: '53.8%' },
    { id: '#6578922', date: '15/03/2026 13:45', pag: 'Pendente', env: 'Não Enviado', val: 'R$ 120,00', cost: 'R$ 50,00', profit: 'R$ 70,00', margin: '58.3%' },
    { id: '#6578921', date: '15/03/2026 11:10', pag: 'Pago', env: 'Enviado', val: 'R$ 540,50', cost: 'R$ 280,00', profit: 'R$ 260,50', margin: '48.2%' },
    { id: '#6578920', date: '14/03/2026 22:30', pag: 'Cancelado', env: '-', val: 'R$ 89,00', cost: 'R$ 40,00', profit: 'R$ 49,00', margin: '55.1%' },
  ];

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="dashboard-hero enterprise-header">
        <h1 className="hero-title">Vendas</h1>
        <div className="flex-center header-filters">
          <div className="month-selector glass-panel">
            <span>Hoje: 15 de Março</span>
          </div>
          <button className="btn-premium btn-primary">Filtrar</button>
        </div>
      </div>


      <div className={`wintrack-kpi-grid ${blurClass}`}>
        {stats.map((s, i) => (
          <div key={i} className="wintrack-card">
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
            <div className={`sub-value flex-center ${s.isPositive ? 'success' : 'danger'}`}>
              {s.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {s.change}
            </div>
          </div>
        ))}
      </div>


      <div className={`glass-panel section-panel ${blurClass} clean-vendas-panel`}>
        <div className="flex-between header-row">
          <div className="flex-center status-filters">
            <span className="status-badge pago">Pagas</span>
            <span className="status-badge pendente">Pendentes</span>
            <span className="status-badge danger">Não Enviadas</span>
          </div>
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Buscar pedido..." className="search-input" />
          </div>
        </div>

        
        <div className="wintrack-table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="wintrack-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Pagamento</th>
                <th>Envio</th>
                <th>Valor</th>
                <th>Custo</th>
                <th>Lucro</th>
                <th>Margem</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, idx) => (
                <tr key={idx}>
                  <td className="highlight">{o.id}</td>
                  <td className="text-muted">{o.date}</td>
                  <td><span className={`status-badge ${o.pag === 'Pago' ? 'pago' : o.pag === 'Cancelado' ? 'danger' : 'pendente'}`}>{o.pag}</span></td>
                  <td><span className={`status-badge ${o.env === 'Enviado' ? 'pago' : ''}`}>{o.env}</span></td>
                  <td className="main-value">{o.val}</td>
                  <td className="text-muted">{o.cost}</td>
                  <td className="success">{o.profit}</td>
                  <td className="margin-cell">{o.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
