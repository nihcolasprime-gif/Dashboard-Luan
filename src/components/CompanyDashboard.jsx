import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight, 
  ShoppingCart, Target, BarChart3, Calculator, Receipt, 
  ArrowUpRight, ArrowDownRight, Briefcase, Plus, Pencil, Trash2, Link2
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const CompanyDashboard = ({ oculto = false }) => {
  const { transacoes, ecommerceStats, deleteTransacao } = useApp();
  const now = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(now.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(now.getFullYear());

  const mudarMes = (delta) => {
    let novoMes = mesSelecionado + delta;
    let novoAno = anoSelecionado;
    if (novoMes < 0) { novoMes = 11; novoAno--; }
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    setMesSelecionado(novoMes);
    setAnoSelecionado(novoAno);
  };

  const blurStyle = {
    filter: oculto ? 'blur(12px)' : 'none',
    transition: 'filter 0.3s ease',
  };

  const kpis = [
    { label: 'Faturamento', value: formatCurrency(ecommerceStats.kpis.faturamento), sub: 'Sem meta', icon: DollarSign },
    { label: 'Investimento', value: formatCurrency(ecommerceStats.kpis.investimento), sub: 'Sem meta', icon: ShoppingCart },
    { label: 'Lucro Bruto', value: formatCurrency(ecommerceStats.kpis.lucroBruto), sub: 'Margem: 0%', icon: TrendingUp },
    { label: 'Lucro sogra', value: formatCurrency(ecommerceStats.kpis.lucroSogra), sub: '36 vendas', icon: Calculator },
    { label: 'ROAS', value: ecommerceStats.kpis.roas || '-', sub: 'Pode melhorar', icon: Target },
    { label: 'Contador (CPA)', value: formatCurrency(ecommerceStats.kpis.cpa), sub: 'Custo por', icon: Receipt },
  ];

  const manualExpenses = transacoes.filter(t => t.escopo === 'empresa' && t.tipo === 'despesa');

  return (
    <div className="wintrack-theme">
      {/* FILTERS SECTION */}
      <div className="flex-between dashboard-filters">
        <div className="month-selector glass-panel compact">
          <button className="icon-btn" onClick={() => mudarMes(-1)}><ChevronLeft size={20} /></button>
          <span className="current-month">
            {MESES[mesSelecionado]} {anoSelecionado}
          </span>
          <button className="icon-btn" onClick={() => mudarMes(1)}><ChevronRight size={20} /></button>
        </div>
        
        <div className="glass-panel filter-pills">
          {['Hoje', 'Ontem', '7 dias', 'Mês', 'Máximo'].map(f => (
            <button 
              key={f} 
              className={`filter-pill ${f === 'Hoje' ? 'active' : ''}`} 
            >
              {f}
            </button>
          ))}
        </div>
      </div>


      {/* LARGE TITLE SECTION */}
      <div className="dashboard-hero">
        <h1 className="hero-title">
          Painel Nação Esportes
        </h1>

        <div className="hero-actions">
          <button className="btn-premium btn-outline">
            <Link2 size={22} /> <span>Conectar Nuvemshop</span>
          </button>
          <button className="btn-premium btn-danger">
            <TrendingDown size={22} /> <span>Nova Despesa</span>
          </button>
          <button className="btn-premium btn-primary">
            <TrendingUp size={22} /> <span>Nova Receita</span>
          </button>
        </div>
      </div>


      {/* KPI GRID */}
      <div className="wintrack-kpi-grid" style={blurStyle}>
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isMainKpi = kpi.label === 'Faturamento' || kpi.label === 'Lucro Bruto';
          return (
            <div key={i} className={`wintrack-card ${isMainKpi ? 'gold-border' : ''}`}>
              <div className="label">{kpi.label}</div>
              <div className="value">{kpi.value}</div>
              <div className="sub-value">{kpi.sub}</div>
              <div className="icon-box"><Icon size={20} /></div>
            </div>
          );
        })}
      </div>

      {/* OPERATIONAL DATA */}
      <div className="grid-2">
        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3><Receipt size={18} /> Custos Operacionais</h3>
          </div>
          <div className="wintrack-list" style={blurStyle}>
            {manualExpenses.map(exp => (
              <div key={exp.id} className="list-item-premium">
                <div className="item-info">
                  <div className="name">{exp.nome}</div>
                  <div className="category">{exp.categoria}</div>
                </div>
                <div className="item-actions">
                  <span className="value danger">{formatCurrency(exp.valor)}</span>
                  <button className="icon-btn delete" onClick={() => deleteTransacao(exp.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            <div className="list-footer">
              <span>Total de Custos</span>
              <span className="danger">{formatCurrency(manualExpenses.reduce((acc, curr) => acc + curr.valor, 0))}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3><Target size={18} /> Performance</h3>
          </div>
          <div className="stats-container" style={blurStyle}>
            <div className="stat-row">
              <span className="text-muted">Período de ROI</span>
              <span className="stat-value">0,0 %</span>
            </div>
            <div className="stat-row">
              <span className="text-muted">Total de Vendas</span>
              <span className="stat-value highlight">36</span>
            </div>
          </div>
        </div>
      </div>


      {/* TOP 10 DATA */}
      <div className="grid-2">
        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3><ShoppingCart size={18} /> Top 10 - Qtd Vendida</h3>
          </div>
          <div className="wintrack-table-container">
            <table className="wintrack-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, nome: 'Camisa Grêmio III 25/26 - Torcedor Umbro Mas...', qtd: 5, valor: 189.90 },
                  { id: 2, nome: 'Camisa Grêmio I 25/26 - Torcedor Umbro Mas...', qtd: 3, valor: 189.90 },
                  { id: 3, nome: 'Camisa Internacional I 24/25 - Torcedor Adidas...', qtd: 2, valor: 169.90 },
                ].map(p => (
                  <tr key={p.id}>
                    <td className="rank"><strong>{p.id}</strong></td>
                    <td className="product-name">{p.nome}</td>
                    <td className="quantity">{p.qtd}</td>
                    <td className="price">{formatCurrency(p.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3><DollarSign size={18} /> Top 10 - Faturamento</h3>
          </div>
          <div className="wintrack-table-container">
            <table className="wintrack-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produto</th>
                  <th>Faturamento</th>
                  <th>Qtd</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, nome: 'Camisa Grêmio III 25/26 - Torcedor Umbro ...', faturamento: 949.50, qtd: 5 },
                  { id: 2, nome: 'Camisa Grêmio I 25/26 - Torcedor Umbro ...', faturamento: 569.70, qtd: 3 },
                  { id: 3, nome: 'Camisa Internacional I 24/25 - Torcedor Adid...', faturamento: 339.80, qtd: 2 },
                ].map(p => (
                  <tr key={p.id}>
                    <td className="rank"><strong>{p.id}</strong></td>
                    <td className="product-name">{p.nome}</td>
                    <td className="revenue highlight">{formatCurrency(p.faturamento)}</td>
                    <td className="quantity">{p.qtd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/* VENDAS LIST */}
      <div className="glass-panel section-panel">
        <div className="flex-between header-row">
          <h3><ShoppingCart size={18} /> Lista de Vendas</h3>
          <div className="search-box">
            <input type="text" placeholder="Buscar pedido..." className="search-input" />
          </div>
        </div>
        <div className="wintrack-table-container" style={blurStyle}>
          <table className="wintrack-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Status</th>
                <th>Envio</th>
                <th>Valor</th>
                <th>Lucro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#137', data: '10/03/26', status: 'Pago', envio: 'Enviado', valor: 161.80, lucro: 151.90 },
                { id: '#136', data: '08/03/26', status: 'Pago', envio: 'Enviado', valor: 206.91, lucro: 206.91 },
                { id: '#135', data: '03/03/26', status: 'Pago', envio: 'Não Separado', valor: 399.80, lucro: 399.80 },
              ].map((sale, i) => (
                <tr key={i}>
                  <td><strong>{sale.id}</strong></td>
                  <td>{sale.data}</td>
                  <td><span className="status-badge pago">{sale.status}</span></td>
                  <td><span className="status-badge">{sale.envio}</span></td>
                  <td className="price">{formatCurrency(sale.valor)}</td>
                  <td className="revenue highlight">{formatCurrency(sale.lucro)}</td>
                  <td>
                    <div className="flex-center actions">
                      <button className="icon-btn edit"><Pencil size={14} /></button>
                      <button className="icon-btn delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* RESULTS TABLE */}
      <div className="glass-panel section-panel">
        <div className="flex-between header-row">
          <h3><BarChart3 size={18} /> Tabela de Resultados Diário</h3>
        </div>
        <div className="wintrack-table-container" style={blurStyle}>
          <table className="wintrack-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Investimento</th>
                <th>Vendas</th>
                <th>CPA</th>
                <th>Faturamento</th>
                <th>ROI</th>
                <th>ROAS</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>15/03/2026</td>
                  <td className="warning">R$ 0,00</td>
                  <td className="quantity">36</td>
                  <td>R$ 0,00</td>
                  <td className="revenue highlight">R$ 8.200,16</td>
                  <td className="success">0%</td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CompanyDashboard;
