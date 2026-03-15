import React, { useState } from 'react';
import { X } from 'lucide-react';

const TransacaoModal = ({ isOpen, onClose, onSave, editData, categorias, escopo }) => {
  const [form, setForm] = useState(editData || {
    nome: '', valor: '', tipo: 'despesa', categoria: '', data: new Date().toISOString().split('T')[0], escopo
  });

  React.useEffect(() => {
    if (editData) setForm(editData);
    else setForm({ nome: '', valor: '', tipo: 'despesa', categoria: '', data: new Date().toISOString().split('T')[0], escopo });
  }, [editData, isOpen, escopo]);

  if (!isOpen) return null;

  const tipoCategories = categorias?.[escopo]?.[form.tipo] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.valor || !form.categoria) return;
    onSave({ ...form, valor: parseFloat(form.valor), escopo });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel premium-modal">
        <div className="flex-between header-row">
          <h2>{editData ? 'Editar Transação' : 'Nova Transação'}</h2>
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
              placeholder="Ex: Aluguel, Supermercado..."
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
              <label>Data</label>
              <input
                type="date"
                required
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value, categoria: '' })}
              >
                <option value="despesa">Despesa</option>
                <option value="receita">Receita</option>
              </select>
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                required
              >
                <option value="">Selecione...</option>
                {tipoCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="pago"
              checked={form.pago}
              onChange={(e) => setForm({ ...form, pago: e.target.checked })}
            />
            <label htmlFor="pago">Confirmar pagamento/recebimento</label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-premium btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-premium btn-primary">
              {editData ? 'Salvar Alterações' : 'Criar Transação'}
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default TransacaoModal;
