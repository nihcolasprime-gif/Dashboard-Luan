import React from 'react';
import { Settings, User, Bell, Lock, Palette, Database } from 'lucide-react';

const ConfiguracoesPage = ({ oculto }) => {
  const blurClass = oculto ? 'data-hidden' : '';

  const sections = [
    { title: 'Perfil da Empresa', icon: User, desc: 'Logo, nome fantasia e dados fiscais.' },
    { title: 'Segurança & Acesso', icon: Lock, desc: 'Senhas, 2FA e logs de atividade.' },
    { title: 'Notificações', icon: Bell, desc: 'Alertas de vendas e avisos de sistema.' },
    { title: 'Design & Tema', icon: Palette, desc: 'Cores, fontes e marca d\'água.' },
    { title: 'Banco de Dados', icon: Database, desc: 'Exportação de dados e backup Supabase.' },
  ];

  return (
    <div className="enterprise-page animate-fadeIn">
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Configurações</h2>
      </div>

      <div className={`wintrack-list ${blurClass}`} style={{ gap: '0.75rem' }}>
        {sections.map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }}>
            <div className="icon-box" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--color-primary)' }}>
              <s.icon size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{s.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>{s.desc}</p>
            </div>
            <button className="btn-outline" style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
