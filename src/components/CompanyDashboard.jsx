import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight, ShoppingCart, Monitor, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { companyData } from '../data';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const CompanyDashboard = ({ oculto = false }) => {
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

  const totalRevenues = companyData.revenues.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = companyData.expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const blurStyle = {
    filter: oculto ? 'blur(12px)' : 'none',
    userSelect: oculto ? 'none' : 'auto',
    transition: 'filter 0.3s ease',
    pointerEvents: oculto ? 'none' : 'auto',
  };

  const dadosPizza = [
    { name: 'Faturamento', value: totalRevenues, color: 'var(--color-primary)' },
    { name: 'Custos', value: totalExpenses, color: 'var(--color-danger)' },
  ];

  const dadosBarras = companyData.revenues.map(r => ({
    nome: r.name.length > 15 ? r.name.substring(0, 15) + '...' : r.name,
    valor: r.amount
  }));

  const ICONS_MAP = {
    'Marketing': ShoppingCart,
    'Infra': Monitor,
    'Administrativo': Briefcase,
  };

  const cards = [
    { title: 'Caixa Empresa', value: formatCurrency(companyData.balance), icon: DollarSign, type: 'primary' },
    { title: 'Faturamento Total', value: formatCurrency(totalRevenues), icon: TrendingUp, type: 'success' },
    { title: 'Custos Operacionais', value: formatCurrency(totalExpenses), icon: TrendingDown, type: 'warning' },
  ];

  return (
    <div>
      {/* MONTH SELECTOR */}
      <div className="glass-panel month-selector">
        <button className="btn-outline" onClick={() => mudarMes(-1)} style={{ padding: '0.5rem', borderRadius: '8px' }}>
          <ChevronLeft size={20} />
        </button>
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <h3 className="text-serif" style={{ margin: 0, textTransform: 'capitalize' }}>{MESES[mesSelecionado]} {anoSelecionado}</h3>
        </div>
        <button className="btn-outline" onClick={() => mudarMes(1)} style={{ padding: '0.5rem', borderRadius: '8px' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Nação Esportes</h1>
          <p className="text-muted" style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>Painel financeiro da empresa.</p>
        </div>
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
              <div className="card-value" style={blurStyle}>{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* CHARTS ROW */}
      <div className="data-grid-2">
        <div className="glass-panel section-panel">
          <h3 className="text-serif" style={{ marginBottom: '0.25rem' }}>Faturamento vs Custos</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Visão geral do período</p>
          <div style={{ ...blurStyle, display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dadosPizza} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {dadosPizza.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Faturamento</p>
                <h3 style={{ margin: 0, color: 'var(--color-success)' }}>{formatCurrency(totalRevenues)}</h3>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Custos</p>
                <h3 style={{ margin: 0, color: 'var(--color-danger)' }}>{formatCurrency(totalExpenses)}</h3>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Lucro Líquido</p>
                <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>{formatCurrency(totalRevenues - totalExpenses)}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* REVENUE BREAKDOWN */}
        <div className="glass-panel section-panel">
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h3 className="text-serif" style={{ margin: 0 }}>Fontes de Receita</h3>
            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Info Produtos & Fixos</span>
          </div>
          <div style={blurStyle}>
            {companyData.revenues.map(rev => (
              <div key={rev.id} className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex-center" style={{ gap: '0.75rem' }}>
                  <div style={{ color: 'var(--color-primary)', background: 'rgba(0,0,0,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                    <TrendingUp size={14} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{rev.name}</span>
                    <p className="text-muted" style={{ fontSize: '0.7rem', margin: 0 }}>{rev.category}</p>
                  </div>
                </div>
                <strong style={{ fontSize: '0.9rem' }}>{formatCurrency(rev.amount)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="data-grid-equal">
        {/* BAR CHART */}
        <div className="glass-panel section-panel">
          <h3 className="text-serif" style={{ marginBottom: '0.25rem' }}>Performance por Produto</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Receitas detalhadas</p>
          <div style={{ ...blurStyle, width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosBarras} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} />
                <YAxis type="category" dataKey="nome" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text)', fontSize: 12, fontWeight: 500 }} width={80} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Faturamento']} contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }} />
                <Bar dataKey="valor" fill="var(--color-primary)" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COSTS & FUTURE EXPENSES */}
        <div className="glass-panel section-panel">
          <h3 className="text-serif" style={{ marginBottom: '0.25rem' }}>Custos & Previsões</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Saídas e próximos vencimentos</p>
          <div style={blurStyle}>
            {companyData.expenses.map(exp => {
              const ExpIcon = ICONS_MAP[exp.category] || Briefcase;
              return (
                <div key={exp.id} className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div className="flex-center" style={{ gap: '0.75rem' }}>
                    <div style={{ color: 'var(--color-danger)', background: 'var(--color-danger-bg)', padding: '0.5rem', borderRadius: '8px' }}>
                      <ExpIcon size={14} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.875rem' }}>{exp.name}</strong>
                      <p className="text-muted" style={{ fontSize: '0.7rem', margin: 0 }}>{exp.category}</p>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>{formatCurrency(exp.amount)}</span>
                </div>
              );
            })}

            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Previsões Futuras</h4>
              {companyData.futureExpenses.map(fExp => (
                <div key={fExp.id} className="flex-between" style={{ padding: '0.5rem 0' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem' }}>{fExp.name}</strong>
                    <p className="text-muted" style={{ fontSize: '0.7rem', margin: 0 }}>Previsto: {fExp.dueDate}</p>
                  </div>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(fExp.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
