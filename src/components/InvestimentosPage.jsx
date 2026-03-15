import React, { useState } from 'react';
import { Plus, Pencil, Trash2, TrendingUp, DollarSign, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import InvestimentoModal from './InvestimentoModal';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const InvestimentosPage = ({ escopo = 'pessoal', oculto }) => {
  const { investimentos, addInvestimento, updateInvestimento, deleteInvestimento } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvestimentos = investimentos.filter(inv => {
    const invEscopo = inv.escopo || 'pessoal';
    if (invEscopo !== escopo) return false;
    return inv.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           inv.corretora?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalInvestido = filteredInvestimentos.reduce((sum, inv) => sum + inv.valor, 0);

  const handleSave = (data) => {
    if (editData) {
      updateInvestimento(editData.id, data);
    } else {
      addInvestimento({ ...data, escopo });
    }
    setEditData(null);
  };

  const handleEdit = (inv) => {
    setEditData(inv);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este investimento?')) {
      deleteInvestimento(id);
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
        <h1 className="hero-title">Meus Investimentos</h1>
        <p className="text-muted">Acompanhe seu patrimônio e rentabilidade</p>
      </div>

      <div className="glass-panel section-panel">
        <div className="flex-between header-row">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar ativo/corretora..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-premium btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={18} /> Novo Ativo
          </button>
        </div>

        {/* Summary Cards */}
        <div className="overview-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '1.5rem' }}>
          <div className="glass-panel overview-card">
            <div className="card-header">
              <h3 className="card-title">Total Investido</h3>
              <div className="card-icon primary"><DollarSign size={20} /></div>
            </div>
            <div className="card-value" style={blurStyle}>{formatCurrency(totalInvestido)}</div>
          </div>
          <div className="glass-panel overview-card">
            <div className="card-header">
              <h3 className="card-title">Ativos na Carteira</h3>
              <div className="card-icon success"><TrendingUp size={20} /></div>
            </div>
            <div className="card-value">{investimentos.length}</div>
          </div>
        </div>

        {/* Investment List */}
        <h3 className="text-serif" style={{ marginBottom: '1rem' }}>Carteira</h3>
        {investimentos.length === 0 ? (
          <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>Nenhum investimento cadastrado.</p>
        ) : (
          <div className="wintrack-table-container" style={blurStyle}>
            <table className="wintrack-table">
              <thead>
                <tr>
                  <th>Ativo</th>
                  <th>Corretora</th>
                  <th>Categoria</th>
                  <th>Valor Atual</th>
                  <th>Retorno</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestimentos.map(inv => (
                  <tr key={inv.id}>
                    <td><strong>{inv.nome}</strong></td>
                    <td>{inv.corretora}</td>
                    <td><span className="badge-small">{inv.categoria}</span></td>
                    <td className="success">{formatCurrency(inv.valor)}</td>
                    <td className="success">{inv.retorno}</td>
                    <td>
                      <div className="flex-center actions">
                        <button className="icon-btn edit" onClick={() => handleEdit(inv)}><Pencil size={14} /></button>
                        <button className="icon-btn delete" onClick={() => handleDelete(inv.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InvestimentoModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
};

export default InvestimentosPage;
