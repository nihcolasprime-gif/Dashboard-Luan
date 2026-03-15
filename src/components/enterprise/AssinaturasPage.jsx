import React from 'react';
import { CreditCard, Repeat, ShieldCheck, TrendingUp, BarChart } from 'lucide-react';

const AssinaturasPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Assinaturas & MRR</h2>
        <div className="flex-center" style={{ gap: '1rem' }}>
          <button className="btn-primary" style={{ background: 'var(--color-primary)', color: '#0d1b3e' }}>Gerar Checkout</button>
        </div>
      </div>

      <div className="wintrack-kpi-grid" style={{ marginBottom: '2.5rem', ...blurStyle }}>
        <div className="wintrack-card gold-border">
          <div className="label">MRR (Recorrência Mensal)</div>
          <div className="value">R$ 12.850,00</div>
          <div className="sub-value" style={{ color: 'var(--color-success)' }}>+8% este mês</div>
          <div className="icon-box"><Repeat size={20} /></div>
        </div>
        <div className="wintrack-card">
          <div className="label">Churn Rate</div>
          <div className="value">1.2%</div>
          <div className="sub-value">Meta: abaixo de 2%</div>
          <div className="icon-box"><ShieldCheck size={20} /></div>
        </div>
        <div className="wintrack-card">
          <div className="label">LTV (Lifetime Value)</div>
          <div className="value">R$ 2.450,00</div>
          <div className="sub-value">Duração média: 14 meses</div>
          <div className="icon-box"><TrendingUp size={20} /></div>
        </div>
        <div className="wintrack-card">
          <div className="label">Assinantes Ativos</div>
          <div className="value">154</div>
          <div className="sub-value">Plano Pro: 120 | Lite: 34</div>
          <div className="icon-box"><BarChart size={20} /></div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', ...blurStyle }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Últimas Renovações</h3>
        <div className="wintrack-table-container">
          <table className="wintrack-table">
            <thead>
              <tr>
                <th>Plano</th>
                <th>Assinante</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">
                  Ainda não há assinaturas ativas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssinaturasPage;
