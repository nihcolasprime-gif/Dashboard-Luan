import { ShoppingBag, TrendingUp, Package, ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';

const SalesPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const pipelineStats = [];

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


      <div className="wintrack-kanban" style={blurStyle}>
        <div className="kanban-column glass-panel">
          <div className="column-header">
            <h4>Novos Leads <span className="count">0</span></h4>
          </div>
          <div className="column-body">
            {/* Vazio */}
          </div>
        </div>

        <div className="kanban-column glass-panel">
          <div className="column-header">
            <h4>Em Contato <span className="count">0</span></h4>
          </div>
          <div className="column-body">
             {/* Vazio */}
          </div>
        </div>

        <div className="kanban-column glass-panel">
          <div className="column-header">
            <h4>Negociação <span className="count">0</span></h4>
          </div>
          <div className="column-body">
             {/* Vazio */}
          </div>
        </div>

        <div className="kanban-column glass-panel" style={{ borderColor: 'rgba(52, 211, 153, 0.2)' }}>
          <div className="column-header">
            <h4>Ganho <span className="count success">0</span></h4>
          </div>
          <div className="column-body">
             {/* Vazio */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
