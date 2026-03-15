// Nuvemshop API Service
// Reads token and user_id from localStorage (set by OAuth callback)

const BASE_URL = 'https://api.tiendanube.com/v1';
const USER_AGENT = 'NacaoDados (Luanframos25@gmail.com)';

function getCredentials() {
  const token = localStorage.getItem('nuvemshop_access_token');
  const userId = localStorage.getItem('nuvemshop_user_id');
  return { token, userId };
}

function getHeaders() {
  const { token } = getCredentials();
  return {
    'Authentication': `bearer ${token}`,
    'User-Agent': USER_AGENT,
    'Content-Type': 'application/json',
  };
}

export function isConnected() {
  const { token, userId } = getCredentials();
  return !!(token && userId);
}

export async function fetchOrders(params = {}) {
  const { userId } = getCredentials();
  if (!userId) throw new Error('Nuvemshop não conectada');

  const query = new URLSearchParams({ per_page: 50, ...params }).toString();
  const res = await fetch(`${BASE_URL}/${userId}/orders?${query}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Erro ao buscar pedidos: ${res.status}`);
  return res.json();
}

export async function fetchProducts(params = {}) {
  const { userId } = getCredentials();
  if (!userId) throw new Error('Nuvemshop não conectada');

  const query = new URLSearchParams({ per_page: 50, ...params }).toString();
  const res = await fetch(`${BASE_URL}/${userId}/products?${query}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Erro ao buscar produtos: ${res.status}`);
  return res.json();
}

export async function fetchStoreInfo() {
  const { userId } = getCredentials();
  if (!userId) throw new Error('Nuvemshop não conectada');

  const res = await fetch(`${BASE_URL}/${userId}/store`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Erro ao buscar dados da loja: ${res.status}`);
  return res.json();
}

// Calculate KPIs from real order data
export function calcKpisFromOrders(orders = []) {
  const paidOrders = orders.filter(o =>
    o.payment_status === 'paid' || o.payment_status === 'voided'
  );

  const faturamento = paidOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
  const totalVendas = paidOrders.length;

  return {
    faturamento,
    investimento: 0, // Needs Meta Ads integration
    lucroBruto: faturamento, // Without cost data
    lucroSogra: faturamento, // Without cost data
    roas: 0,
    cpa: 0,
    vendas: totalVendas,
  };
}
