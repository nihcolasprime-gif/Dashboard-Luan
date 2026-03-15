import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [transacoes, setTransacoes] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [saldos, setSaldos] = useState({ pessoal: 0, empresa: 0 });
  const [loading, setLoading] = useState(true);
  const [ecommerceStats, setEcommerceStats] = useState({
    orders: [],
    kpis: {
      faturamento: 0,
      investimento: 0,
      lucroBruto: 0,
      lucroSogra: 0,
      roas: 0,
      cpa: 0,
      vendas: 0
    }
  });

  // ======== LOAD ALL DATA ========
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [tRes, iRes, pRes, cRes, sRes] = await Promise.all([
        supabase.from('transacoes').select('*').order('data', { ascending: false }),
        supabase.from('investimentos').select('*'),
        supabase.from('parcelas').select('*').order('data_vencimento', { ascending: true }),
        supabase.from('categorias').select('*'),
        supabase.from('saldos').select('*'),
      ]);
      if (tRes.data) setTransacoes(tRes.data);
      if (iRes.data) setInvestimentos(iRes.data);
      if (pRes.data) setParcelas(pRes.data.map(p => ({ ...p, dataVencimento: p.data_vencimento, parcelaAtual: p.parcela_atual })));
      if (cRes.data) setCategorias(cRes.data);
      if (sRes.data) {
        const sObj = {};
        sRes.data.forEach(s => { sObj[s.escopo] = s.valor; });
        setSaldos(sObj);
      }
      
      // Update ecommerce stats with real data if available, or keep mock
      if (tRes.data) {
        const orders = tRes.data.filter(x => x.escopo === 'empresa' && x.tipo === 'receita');
        setEcommerceStats(prev => ({
          ...prev,
          orders: orders
        }));
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get categories grouped
  const getCategorias = (escopo, tipo) => {
    return categorias.filter(c => c.escopo === escopo && c.tipo === tipo).map(c => c.nome);
  };

  const getCategoriasGrouped = useCallback(() => {
    const grouped = { pessoal: { receita: [], despesa: [] }, empresa: { receita: [], despesa: [] } };
    categorias.forEach(c => {
      const { escopo, tipo, nome } = c;
      if (grouped[escopo] && grouped[escopo][tipo]) {
        grouped[escopo][tipo].push(nome);
      }
    });
    return grouped;
  }, [categorias]);

  // ======== TRANSAÇÕES CRUD ========
  const addTransacao = useCallback(async (t) => {
    const { data, error } = await supabase.from('transacoes').insert([{
      nome: t.nome, valor: t.valor, tipo: t.tipo, categoria: t.categoria, escopo: t.escopo, data: t.data
    }]).select();
    if (data) setTransacoes(prev => [data[0], ...prev]);
    if (error) console.error(error);
  }, []);

  const updateTransacao = useCallback(async (id, updates) => {
    const { error } = await supabase.from('transacoes').update({
      nome: updates.nome, valor: updates.valor, tipo: updates.tipo, categoria: updates.categoria, data: updates.data
    }).eq('id', id);
    if (!error) setTransacoes(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTransacao = useCallback(async (id) => {
    const { error } = await supabase.from('transacoes').delete().eq('id', id);
    if (!error) setTransacoes(prev => prev.filter(t => t.id !== id));
  }, []);

  // ======== INVESTIMENTOS CRUD ========
  const addInvestimento = useCallback(async (inv) => {
    const { data, error } = await supabase.from('investimentos').insert([{
      nome: inv.nome, valor: inv.valor, retorno: inv.retorno, escopo: inv.escopo || 'pessoal'
    }]).select();
    if (data) setInvestimentos(prev => [...prev, data[0]]);
    if (error) console.error(error);
  }, []);

  const updateInvestimento = useCallback(async (id, updates) => {
    const { error } = await supabase.from('investimentos').update({
      nome: updates.nome, valor: updates.valor, retorno: updates.retorno
    }).eq('id', id);
    if (!error) setInvestimentos(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  }, []);

  const deleteInvestimento = useCallback(async (id) => {
    const { error } = await supabase.from('investimentos').delete().eq('id', id);
    if (!error) setInvestimentos(prev => prev.filter(i => i.id !== id));
  }, []);

  // ======== PARCELAS CRUD ========
  const addParcela = useCallback(async (p) => {
    const { data, error } = await supabase.from('parcelas').insert([{
      nome: p.nome, valor: p.valor, escopo: p.escopo, data_vencimento: p.dataVencimento, parcela_atual: p.parcelaAtual
    }]).select();
    if (data) setParcelas(prev => [...prev, { ...data[0], dataVencimento: data[0].data_vencimento, parcelaAtual: data[0].parcela_atual }]);
    if (error) console.error(error);
  }, []);

  const updateParcela = useCallback(async (id, updates) => {
    const { error } = await supabase.from('parcelas').update({
      nome: updates.nome, valor: updates.valor, data_vencimento: updates.dataVencimento, parcela_atual: updates.parcelaAtual
    }).eq('id', id);
    if (!error) setParcelas(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteParcela = useCallback(async (id) => {
    const { error } = await supabase.from('parcelas').delete().eq('id', id);
    if (!error) setParcelas(prev => prev.filter(p => p.id !== id));
  }, []);

  // ======== CATEGORIAS ========
  const addCategoria = useCallback(async (escopo, tipo, nome) => {
    const { data, error } = await supabase.from('categorias').insert([{ nome, tipo, escopo }]).select();
    if (data) setCategorias(prev => [...prev, data[0]]);
    if (error) console.error(error);
  }, []);

  const deleteCategoria = useCallback(async (escopo, tipo, nome) => {
    const cat = categorias.find(c => c.escopo === escopo && c.tipo === tipo && c.nome === nome);
    if (cat) {
      const { error } = await supabase.from('categorias').delete().eq('id', cat.id);
      if (!error) setCategorias(prev => prev.filter(c => c.id !== cat.id));
    }
  }, [categorias]);

  const value = {
    transacoes, addTransacao, updateTransacao, deleteTransacao,
    investimentos, addInvestimento, updateInvestimento, deleteInvestimento,
    parcelas, addParcela, updateParcela, deleteParcela,
    categorias, getCategorias, getCategoriasGrouped, addCategoria, deleteCategoria,
    saldos, setSaldos, loading, ecommerceStats
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
