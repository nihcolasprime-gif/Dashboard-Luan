import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight, Plus, Pencil, X } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useApp } from '../contexts/AppContext';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const PersonalDashboard = ({ oculto = false }) => {
  const { transacoes, categorias, investimentos, parcelas, addCategoria, updateCategoria, deleteCategoria } = useApp();
  const now = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(now.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(now.getFullYear());
  const [newCategory, setNewCategory] = useState('');

  const mudarMes = (delta) => {
    let novoMes = mesSelecionado + delta;
    let novoAno = anoSelecionado;
    if (novoMes < 0) { novoMes = 11; novoAno--; }
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    setMesSelecionado(novoMes);
    setAnoSelecionado(novoAno);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategoria('pessoal', 'despesa', newCategory.trim());
      setNewCategory('');
    }
  };

  const personalTransacoes = transacoes.filter(t => t.escopo === 'pessoal');
  const totalIncomes = personalTransacoes.filter(t => t.tipo === 'receita').reduce((acc, curr) => acc + curr.valor, 0);
  const totalExpenses = personalTransacoes.filter(t => t.tipo === 'despesa').reduce((acc, curr) => acc + curr.valor, 0);
  const currentBalance = totalIncomes - totalExpenses;

  const blurStyle = {
    filter: oculto ? 'blur(12px)' : 'none',
    userSelect: oculto ? 'none' : 'auto',
    transition: 'filter 0.3s ease',
    pointerEvents: oculto ? 'none' : 'auto',
  };

  const dadosPizza = [
    { name: 'Receitas', value: totalIncomes, color: 'var(--color-success)' },
    { name: 'Despesas', value: totalExpenses, color: 'var(--color-warning)' },
  ];

  const dadosBarras = personalTransacoes.filter(t => t.tipo === 'despesa').map(e => ({
    nome: e.nome.length > 12 ? e.nome.substring(0, 12) + '...' : e.nome,
    valor: e.valor
  }));

  const cards = [
    { title: 'Saldo Principal', value: formatCurrency(currentBalance), icon: DollarSign, type: 'primary' },
    { title: 'Entradas no Mês', value: formatCurrency(totalIncomes), icon: TrendingUp, type: 'success' },
    { title: 'Saídas no Mês', value: formatCurrency(totalExpenses), icon: TrendingDown, type: 'warning' },
  ];

  return (
    <div>
      {/* MONTH SELECTOR */}
      <div className="month-selector glass-panel compact" style={{ marginBottom: 'var(--space-lg)' }}>
        <button className="icon-btn" onClick={() => mudarMes(-1)}><ChevronLeft size={20} /></button>
        <span className="current-month">
          {MESES[mesSelecionado]} {anoSelecionado}
        </span>
        <button className="icon-btn" onClick={() => mudarMes(1)}><ChevronRight size={20} /></button>
      </div>


      {/* PAGE HEADER */}
      <div className="dashboard-hero">
        <h1 className="hero-title">Controle Pessoal</h1>
        <p className="text-muted">Análise detalhada do período selecionado.</p>
      </div>


      {/* OVERVIEW CARDS */}
      <div className="overview-grid">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-panel overview-card">
              <div className="card-header">
                <h3 className="card-title">{card.title}</h3>
                <div className={`card-icon ${card.type}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="card-value" style={blurStyle}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS ROW */}
      <div className="grid-2">
        <div className="glass-panel section-panel">
          <div className="header-row">
            <h3>Proporção Entradas vs Saídas</h3>
            <p className="text-muted">Rentabilidade mensal</p>
          </div>
          <div className="chart-container-flex" style={blurStyle}>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dadosPizza} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <p className="text-muted">Receitas</p>
                <h3 className="success">{formatCurrency(totalIncomes)}</h3>
              </div>
              <div className="legend-item">
                <p className="text-muted">Despesas</p>
                <h3 className="warning">{formatCurrency(totalExpenses)}</h3>
              </div>
              <div className="legend-total">
                <p className="text-muted">Resultado</p>
                <h2 className={(totalIncomes - totalExpenses) >= 0 ? 'success' : 'danger'}>
                  {formatCurrency(totalIncomes - totalExpenses)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* INVESTMENTS PANEL */}
        <div className="glass-panel section-panel">
          <div className="flex-between header-row">
            <h3>Investimentos</h3>
            <span className="badge-small">Previsão em tempo real</span>
          </div>
          <div className="stats-summary" style={blurStyle}>
            <h2 className="success">{formatCurrency(investimentos.reduce((sum, i) => sum + i.valor, 0))}</h2>
            <span className="text-muted">+1.5% este mês</span>
            <div className="items-list">
              {investimentos.map(inv => (
                <div key={inv.id} className="list-item-premium">
                  <div className="item-info-flex">
                    <div className="icon-badge success">
                      <TrendingUp size={14} />
                    </div>
                    <span>{inv.nome}</span>
                  </div>
                  <div className="item-values">
                    <strong className="main-value">{formatCurrency(inv.valor)}</strong>
                    <p className="sub-value">{inv.retorno}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* BOTTOM ROW */}
      <div className="data-grid-equal">
        {/* BAR CHART */}
        <div className="glass-panel section-panel">
          <div className="header-row">
            <h3>Top Despesas</h3>
            <p className="text-muted">Maiores saídas no período</p>
          </div>
          <div className="chart-box-full" style={blurStyle}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosBarras} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} />
                <YAxis type="category" dataKey="nome" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text)', fontSize: 12, fontWeight: 500 }} width={80} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Valor']} contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }} />
                <Bar dataKey="valor" fill="var(--color-warning)" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* FUTURE EXPENSES + CATEGORIES */}
        <div className="glass-panel section-panel">
          <div className="header-row">
            <h3>Despesas Futuras</h3>
            <p className="text-muted">Parcelamentos e previsões</p>
          </div>
          <div className="items-list" style={blurStyle}>
            {parcelas.filter(p => p.escopo === 'pessoal').map(fExp => (
              <div key={fExp.id} className="list-item-premium">
                <div className="item-info">
                  <div className="name">{fExp.nome}</div>
                  <div className="category">Vence: {fExp.dataVencimento} • Parc: {fExp.parcelaAtual}</div>
                </div>
                <span className="value">{formatCurrency(fExp.valor)}</span>
              </div>
            ))}
          </div>


          {/* Category Manager */}
          <div className="category-manager">
            <h4>Categorias de Despesa</h4>
            <div className="manager-actions">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nova categoria..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button className="btn-premium btn-primary" onClick={handleAddCategory}>
                <Plus size={16} /> Criar
              </button>
            </div>
            <div className="tags-container">
              {categorias.filter(c => c.escopo === 'pessoal' && c.tipo === 'despesa').map((cat) => (
                <div key={cat.id} className="category-tag-premium">
                  <span>{cat.nome}</span>
                  <div className="tag-actions">
                    <button 
                      onClick={() => {
                        const novoNome = prompt('Novo nome para a categoria:', cat.nome);
                        if (novoNome && novoNome !== cat.nome) updateCategoria(cat.id, { nome: novoNome });
                      }}
                      className="tag-btn"
                      title="Editar"
                    >
                      <Pencil size={12} /> 
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Excluir categoria "${cat.nome}"?`)) deleteCategoria(cat.id);
                      }}
                      className="tag-btn danger"
                      title="Excluir"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
