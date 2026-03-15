import React from 'react';
import { Users, UserPlus, Search, Filter, MoreVertical } from 'lucide-react';

const CadastrosPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const customers = [
    { name: 'Luan Silva', email: 'luan@email.com', type: 'VIP', spent: 'R$ 15.420,00', orders: 24 },
    { name: 'Ana Souza', email: 'ana@email.com', type: 'Novo', spent: 'R$ 540,00', orders: 1 },
    { name: 'Marcos Oliveira', email: 'marcos@email.com', type: 'Recorrente', spent: 'R$ 4.200,00', orders: 8 },
    { name: 'Carla Dias', email: 'carla@email.com', type: 'VIP', spent: 'R$ 12.100,00', orders: 15 },
  ];

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
              {customers.map((c, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(226, 176, 83, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${c.type === 'VIP' ? 'pago' : ''}`}>{c.type}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.spent}</td>
                  <td>{c.orders}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="icon-btn" style={{ padding: '0.5rem' }}><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CadastrosPage;
