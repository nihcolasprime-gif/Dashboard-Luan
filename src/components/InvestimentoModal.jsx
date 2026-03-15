import React, { useState } from 'react';
import { X } from 'lucide-react';

const InvestimentoModal = ({ isOpen, onClose, onSave, editData }) => {
  const [form, setForm] = useState(editData || { nome: '', valor: '', retorno: '' });

  React.useEffect(() => {
    if (editData) setForm(editData);
    else setForm({ nome: '', valor: '', retorno: '' });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.valor) return;
    onSave({ ...form, valor: parseFloat(form.valor) });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel premium-modal">
        <div className="flex-between header-row">
          <h2>{editData ? 'Editar Investimento' : 'Novo Investimento'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <label>Nome do Ativo</label>
            <input
              type="text"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: Tesouro Direto Selic 2029"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                placeholder="0,00"
              />
            </div>
            <div className="form-group">
              <label>Corretora</label>
              <input
                type="text"
                value={form.corretora || ''}
                onChange={(e) => setForm({ ...form, corretora: e.target.value })}
                placeholder="Ex: XP, NuInvest..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Retorno/Projeção</label>
            <input
              type="text"
              value={form.retorno}
              onChange={(e) => setForm({ ...form, retorno: e.target.value })}
              placeholder="Ex: +12.5% a.a."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-premium btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-premium btn-primary">
              {editData ? 'Salvar Alterações' : 'Adicionar Ativo'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default InvestimentoModal;
