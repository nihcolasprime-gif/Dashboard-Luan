import React from 'react';
import { Target, Flag, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

const MetasPage = ({ oculto }) => {
  const blurStyle = oculto ? { filter: 'blur(8px)' } : {};

  const metas = [];

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Metas & OKRs</h2>
        <button className="btn-primary" style={{ background: 'var(--color-primary)', color: '#0d1b3e' }}>Nova Meta</button>
      </div>

      <div className="data-grid-equal" style={{ marginBottom: '3rem', ...blurStyle }}>
        {metas.map((m, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{m.title}</span>
              <Target size={16} color={m.color} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{m.current}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Meta: {m.target}</div>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${m.progress}%`, height: '100%', background: m.color, transition: 'width 1s ease' }}></div>
            </div>
            <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 700 }}>{m.progress}%</div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '2rem', ...blurStyle }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Cronograma de Objetivos</h3>
        <div className="wintrack-list">
          {[{ task: 'Ainda não há cronograma definido.', date: '', status: '', icon: Clock }].map((item, idx) => (
            <div key={idx} className="flex-between" style={{ padding: '1rem 0' }}>
              <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start' }}>
                <item.icon size={18} color="var(--color-text-muted)" />
                <span style={{ fontWeight: 500, color: 'var(--color-text-muted)' }}>{item.task}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetasPage;
