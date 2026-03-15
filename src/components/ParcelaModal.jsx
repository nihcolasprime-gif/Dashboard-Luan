import React, { useState } from 'react';
import { X } from 'lucide-react';

const ParcelaModal = ({ isOpen, onClose, onSave, editData, escopo }) => {
  const [form, setForm] = useState(editData || { nome: '', valor: '', dataVencimento: '', parcelaAtual: '', escopo });

  React.useEffect(() => {
    if (editData) setForm(editData);
    else setForm({ nome: '', valor: '', dataVencimento: '', parcelaAtual: '', escopo });
  }, [editData, isOpen, escopo]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.valor || !form.dataVencimento) return;
    onSave({ ...form, valor: parseFloat(form.valor), escopo });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel premium-modal">
        <div className="flex-between header-row">
          <h2>{editData ? 'Editar Parcela' : 'Nova Parcela'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: Assinatura Netflix, Seguro Carro..."
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
              <label>Vencimento</label>
              <input
                type="date"
                required
                value={form.dataVencimento}
                onChange={(e) => setForm({ ...form, dataVencimento: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Parcela (ex: 1/12)</label>
            <input
              type="text"
              value={form.parcelaAtual}
              onChange={(e) => setForm({ ...form, parcelaAtual: e.target.value })}
              placeholder="1/12 (opcional)"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-premium btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-premium btn-primary">
              {editData ? 'Salvar Alterações' : 'Adicionar Parcela'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default ParcelaModal;
