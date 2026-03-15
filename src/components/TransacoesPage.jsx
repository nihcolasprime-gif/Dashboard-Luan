import React, { useState } from 'react';
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import TransacaoModal from './TransacaoModal';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const TransacoesPage = ({ escopo, oculto }) => {
  const { transacoes, addTransacao, updateTransacao, deleteTransacao, getCategoriasGrouped } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categoriasAgrupadas = getCategoriasGrouped();

  const escopoTransacoes = transacoes.filter(t => t.escopo === escopo);

  const filtered = (filtroTipo === 'todos' ? escopoTransacoes : escopoTransacoes.filter(t => t.tipo === filtroTipo))
    .filter(t => t.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || t.categoria?.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = (data) => {
    if (editData) {
      updateTransacao(editData.id, data);
    } else {
      addTransacao(data);
    }
    setEditData(null);
  };

  const handleEdit = (t) => {
    setEditData(t);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      deleteTransacao(id);
    }
  };

  const blurStyle = {
    filter: oculto ? 'blur(12px)' : 'none',
    userSelect: oculto ? 'none' : 'auto',
    transition: 'filter 0.3s ease',
    pointerEvents: oculto ? 'none' : 'auto',
  };

  return (
    <div>
      <div className="dashboard-hero">
        <h1 className="hero-title">Lista de Transações</h1>
        <p className="text-muted">Acompanhe seu fluxo de caixa pessoal</p>
      </div>

      <div className="glass-panel section-panel">
        <div className="flex-between header-row">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar transação..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-premium btn-primary" onClick={() => { setEditData(null); setModalOpen(true); }}>
            <Plus size={18} /> Nova Transação
          </button>
        </div>

        {/* Filters */}
        <div style={{ padding: '0.75rem 0', display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
          {['todos', 'receita', 'despesa'].map(tipo => (
            <button
              key={tipo}
              className={filtroTipo === tipo ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', textTransform: 'capitalize' }}
              onClick={() => setFiltroTipo(tipo)}
            >
              {tipo === 'todos' ? 'Todos' : tipo === 'receita' ? '↑ Receitas' : '↓ Despesas'}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        {filtered.length === 0 ? (
          <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>Nenhuma transação encontrada.</p>
        ) : (
          <div className="wintrack-table-container" style={blurStyle}>
            <table className="wintrack-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.sort((a, b) => new Date(b.data) - new Date(a.data)).map(t => (
                  <tr key={t.id}>
                    <td>{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                    <td><strong>{t.nome}</strong></td>
                    <td><span className="badge-small">{t.categoria}</span></td>
                    <td className={t.tipo === 'receita' ? 'success' : 'danger'}>
                      {t.tipo === 'receita' ? '+' : '-'}{formatCurrency(t.valor)}
                    </td>
                    <td>
                      <span className={`status-badge ${t.pago ? 'pago' : 'pendente'}`}>
                        {t.pago ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                    <td>
                      <div className="flex-center actions">
                        <button className="icon-btn edit" onClick={() => handleEdit(t)} title="Editar"><Pencil size={14} /></button>
                        <button
                          className="icon-btn delete"
                          onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }}
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TransacaoModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
        categorias={categoriasAgrupadas}
        escopo={escopo}
      />
    </div>
  );
};

export default TransacoesPage;
