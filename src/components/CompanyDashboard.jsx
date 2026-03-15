import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight, 
  ShoppingCart, Target, BarChart3, Calculator, Receipt, 
  Link2, Pencil, Trash2
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import TransacaoModal from './TransacaoModal';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const CATEGORIAS = {
  receita: ['Vendas', 'Serviços', 'Rendimento', 'Outros'],
  despesa: ['Fornecedores', 'Marketing', 'Impostos', 'Folha', 'Outros']
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const CompanyDashboard = ({ oculto = false }) => {
  const { transacoes, ecommerceStats, deleteTransacao, addTransacao, updateTransacao } = useApp();
  const now = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(now.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(now.getFullYear());
  const [filtroTempo, setFiltroTempo] = useState('Hoje');

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('receita');
  const [editItem, setEditItem] = useState(null);

  const handleOpenModal = (tipo) => {
    setModalType(tipo);
    setEditItem(null);
    setModalOpen(true);
  };

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
    { label: 'Faturamento', value: formatCurrency(ecommerceStats.kpis.faturamento || 0), sub: '', icon: DollarSign },
    { label: 'Investimento', value: formatCurrency(ecommerceStats.kpis.investimento || 0), sub: '', icon: ShoppingCart },
    { label: 'Lucro Bruto', value: formatCurrency(ecommerceStats.kpis.lucroBruto || 0), sub: '', icon: TrendingUp },
    { label: 'Lucro Líquido', value: formatCurrency(ecommerceStats.kpis.lucroSogra || 0), sub: '', icon: Calculator },
    { label: 'ROAS', value: ecommerceStats.kpis.roas || '-', sub: '', icon: Target },
    { label: 'CPA', value: formatCurrency(ecommerceStats.kpis.cpa || 0), sub: '', icon: Receipt },
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
              className={`filter-pill ${f === filtroTempo ? 'active' : ''}`} 
              onClick={() => setFiltroTempo(f)}
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
          <button className="btn-premium btn-danger" onClick={() => handleOpenModal('despesa')}>
            <TrendingDown size={22} /> <span>Nova Despesa</span>
          </button>
          <button className="btn-premium btn-primary" onClick={() => handleOpenModal('receita')}>
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
              <span className="stat-value highlight">0</span>
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
                {/* Integração Nuvemshop vazia */}
                {[].map(p => (
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
                {/* Integração Nuvemshop vazia */}
                {[].map(p => (
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
              {/* Integração Nuvemshop vazia */}
              {[].map((sale, i) => (
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
              {/* Integração Nuvemshop vazia */}
              {[].map((_, i) => (
                <tr key={i}>
                  <td>15/03/2026</td>
                  <td className="warning">R$ 0,00</td>
                  <td className="quantity">0</td>
                  <td>R$ 0,00</td>
                  <td className="revenue highlight">R$ 0,00</td>
                  <td className="success">0%</td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransacaoModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(data) => {
          if (editItem) {
            updateTransacao(editItem.id, { ...data, tipo: modalType });
          } else {
            addTransacao({ ...data, tipo: modalType, data: new Date().toISOString() });
          }
        }}
        editData={editItem}
        categorias={CATEGORIAS[modalType]}
        escopo="empresa"
      />
    </div>
  );
};

export default CompanyDashboard;
