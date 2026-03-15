import React from 'react';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, PieChart, Landmark } from 'lucide-react';

const FinanceiroEmpresaPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="dashboard-hero enterprise-header">
        <h1 className="hero-title">Financeiro Corporativo</h1>
        <div className="flex-center header-filters">
          <button className="btn-premium btn-outline">Exportar DRE</button>
          <button className="btn-premium btn-primary">Fluxo de Caixa</button>
        </div>
      </div>


      <div className="wintrack-kpi-grid" style={blurStyle}>
        <div className="wintrack-card gold-border glass-panel">
          <div className="label">Saldo em Conta</div>
          <div className="value">R$ 0,00</div>
          <div className="sub-value">-</div>
          <div className="icon-box"><Landmark size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Entradas (Mês)</div>
          <div className="value success">R$ 0,00</div>
          <div className="sub-value success">-</div>
          <div className="icon-box"><ArrowUpCircle size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Saídas (Mês)</div>
          <div className="value danger">R$ 0,00</div>
          <div className="sub-value danger">-</div>
          <div className="icon-box"><ArrowDownCircle size={20} /></div>
        </div>
        <div className="wintrack-card glass-panel">
          <div className="label">Margem Líquida</div>
          <div className="value">0%</div>
          <div className="sub-value">-</div>
          <div className="icon-box"><PieChart size={20} /></div>
        </div>
      </div>


      <div className="grid-2" style={blurStyle}>
        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3>Distribuição de Custos</h3>
          </div>
          <div className="chart-placeholder flex-center">
            <div className="text-muted">Gráfico de Pizza: Impostos, Marketing, Operações, Pessoal</div>
          </div>
        </div>
        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3>Projeção de Lucro</h3>
          </div>
          <div className="chart-placeholder flex-center">
            <div className="text-muted">Gráfico de Linha: Receita vs Despesa (Projeção 6 meses)</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FinanceiroEmpresaPage;
