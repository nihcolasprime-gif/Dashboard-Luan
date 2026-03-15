export const personalData = {
  balance: 4216.00,
  incomes: [
    { id: 1, name: 'Salário', amount: 15000, category: 'Fixa' },
    { id: 2, name: 'Outras Receitas', amount: 3000, category: 'Extra' },
    { id: 3, name: '13º Salário', amount: 3000, category: 'Extra' }
  ],
  expenses: [
    { id: 1, name: 'Supermercado', amount: 2500, category: 'Essencial' },
    { id: 2, name: 'Cartão de crédito', amount: 1800, category: 'Variável' },
    { id: 3, name: 'Prestação da casa', amount: 2929, category: 'Moradia' },
    { id: 4, name: 'Lazer', amount: 900, category: 'Lazer' },
    { id: 5, name: 'Transporte', amount: 1500, category: 'Transporte' }
  ],
  futureExpenses: [
    { id: 1, name: 'Seguro do carro', amount: 1200, dueDate: '2026-04-15', installments: '1/3' }
  ],
  investments: {
    total: 25000,
    forecast: '+1.5% este mês',
    items: [
      { id: 1, name: 'Tesouro Direto', amount: 10000, return: '+12% a.a.' },
      { id: 2, name: 'Ações (PETR4)', amount: 5000, return: '+5% a.a.' },
      { id: 3, name: 'FIIs (MXRF11)', amount: 10000, return: '+8% a.a.' }
    ]
  }
};

export const companyData = {
  name: 'Nação Esportes',
  balance: 150500.00,
  revenues: [
    { id: 1, name: 'Info Produto A', amount: 45000, category: 'Digital' },
    { id: 2, name: 'Consultoria B', amount: 20000, category: 'Serviço' },
    { id: 3, name: 'Mentoria Vip', amount: 15000, category: 'Digital' }
  ],
  expenses: [
    { id: 1, name: 'Tráfego Pago', amount: 10000, category: 'Marketing' },
    { id: 2, name: 'Ferramentas de Software', amount: 2500, category: 'Infra' },
    { id: 3, name: 'Assessoria Contábil', amount: 1500, category: 'Administrativo' }
  ],
  futureExpenses: [
    { id: 1, name: 'Impostos Trimestrais', amount: 8000, dueDate: '2026-06-30' }
  ]
};
