import React from 'react';
import { Users, UserPlus, Search, Filter, MoreVertical } from 'lucide-react';

const CadastrosPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Gestão de Cadastros</h2>
        <button className="btn-primary flex-center" style={{ gap: '0.5rem', background: 'var(--color-primary)', color: '#0d1b3e' }}>
          <UserPlus size={18} /> Novo Cliente
        </button>
      </div>

      <div className="flex-between" style={{ marginBottom: '1.5rem', gap: '1rem', ...blurStyle }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Buscar nome, email ou CPF..." 
            style={{ paddingLeft: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}
          />
        </div>
        <button className="btn-outline flex-center" style={{ gap: '0.5rem', borderRadius: '12px' }}>
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', ...blurStyle }}>
        <div className="wintrack-table-container" style={{ border: 'none', borderRadius: '0' }}>
          <table className="wintrack-table">
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>Tipo</th>
                <th>Total Gasto</th>
                <th>Pedidos</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">
                  Ainda não há clientes cadastrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CadastrosPage;
