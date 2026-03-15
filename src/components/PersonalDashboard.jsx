import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { personalData } from '../data';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const PersonalDashboard = ({ oculto = false }) => {
  const now = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(now.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(now.getFullYear());
  const [categories, setCategories] = useState(['Essencial', 'Variável', 'Moradia', 'Lazer', 'Transporte']);
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
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const totalIncomes = personalData.incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = personalData.expenses.reduce((acc, curr) => acc + curr.amount, 0);

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

  const dadosBarras = personalData.expenses.map(e => ({
    nome: e.name.length > 12 ? e.name.substring(0, 12) + '...' : e.name,
    valor: e.amount
  }));

  const cards = [
    { title: 'Saldo Principal', value: formatCurrency(personalData.balance), icon: DollarSign, type: 'primary' },
    { title: 'Entradas no Mês', value: formatCurrency(totalIncomes), icon: TrendingUp, type: 'success' },
    { title: 'Saídas no Mês', value: formatCurrency(totalExpenses), icon: TrendingDown, type: 'warning' },
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
          <h1>Controle Pessoal</h1>
          <p className="text-muted" style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>Análise detalhada do período selecionado.</p>
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
              <div className="card-value" style={blurStyle}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS ROW */}
      <div className="data-grid-2">
        <div className="glass-panel section-panel">
          <h3 className="text-serif" style={{ marginBottom: '0.25rem' }}>Proporção Entradas vs Saídas</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Rentabilidade mensal</p>
          <div style={{ ...blurStyle, display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: 220 }}>
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
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Receitas</p>
                <h3 style={{ margin: 0, color: 'var(--color-success)' }}>{formatCurrency(totalIncomes)}</h3>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Despesas</p>
                <h3 style={{ margin: 0, color: 'var(--color-warning)' }}>{formatCurrency(totalExpenses)}</h3>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Resultado</p>
                <h2 style={{ margin: 0, color: (totalIncomes - totalExpenses) >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {formatCurrency(totalIncomes - totalExpenses)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* INVESTMENTS PANEL */}
        <div className="glass-panel section-panel">
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h3 className="text-serif" style={{ margin: 0 }}>Investimentos</h3>
            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Previsão em tempo real</span>
          </div>
          <div style={blurStyle}>
            <h2 style={{ color: 'var(--color-success)', margin: '0 0 0.5rem' }}>{formatCurrency(personalData.investments.total)}</h2>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>{personalData.investments.forecast}</span>
            <div style={{ marginTop: '1rem' }}>
              {personalData.investments.items.map(inv => (
                <div key={inv.id} className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div className="flex-center" style={{ gap: '0.75rem' }}>
                    <div style={{ color: 'var(--color-success)', background: 'var(--color-success-bg)', padding: '0.5rem', borderRadius: '8px' }}>
                      <TrendingUp size={14} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{inv.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '0.9rem' }}>{formatCurrency(inv.amount)}</strong>
                    <p className="text-muted" style={{ fontSize: '0.7rem', margin: 0 }}>{inv.return}</p>
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
          <h3 className="text-serif" style={{ marginBottom: '0.25rem' }}>Top Despesas</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Maiores saídas no período</p>
          <div style={{ ...blurStyle, width: '100%', height: 250 }}>
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
          <h3 className="text-serif" style={{ marginBottom: '0.25rem' }}>Despesas Futuras</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Parcelamentos e previsões</p>
          <div style={blurStyle}>
            {personalData.futureExpenses.map(fExp => (
              <div key={fExp.id} className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem' }}>{fExp.name}</strong>
                  <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Vence: {fExp.dueDate} • Parc: {fExp.installments}</p>
                </div>
                <span style={{ fontWeight: 600 }}>{formatCurrency(fExp.amount)}</span>
              </div>
            ))}
          </div>

          {/* Category Manager */}
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>Categorias de Despesa</h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nova categoria..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                style={{ flex: 1 }}
              />
              <button className="btn-primary flex-center" onClick={handleAddCategory} style={{ padding: '0.5rem 1rem', gap: '0.25rem' }}>
                <Plus size={16} /> Criar
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {categories.map((cat, idx) => (
                <span key={idx} className="category-tag">{cat}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
