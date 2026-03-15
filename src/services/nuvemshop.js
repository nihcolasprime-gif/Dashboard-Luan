// Nuvemshop API Service
// Routes all API calls through /api/nuvemshop/proxy (Vercel Serverless Function)
// to avoid CORS issues when calling the Nuvemshop API directly from the browser.

function getCredentials() {
  const token = localStorage.getItem('nuvemshop_access_token');
  const userId = localStorage.getItem('nuvemshop_user_id');
  return { token, userId };
}

export function isConnected() {
  const { token, userId } = getCredentials();
  return !!(token && userId);
}

export function disconnect() {
  localStorage.removeItem('nuvemshop_access_token');
  localStorage.removeItem('nuvemshop_user_id');
}

async function proxyFetch(path, params = {}) {
  const { token, userId } = getCredentials();
  if (!token || !userId) throw new Error('Nuvemshop não conectada');

  const query = new URLSearchParams({ path, userId, token, per_page: 50, ...params }).toString();
  const res = await fetch(`/api/nuvemshop/proxy?${query}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Erro ${res.status}`);
  }
  return res.json();
}

export async function fetchOrders(params = {}) {
  return proxyFetch('orders', params);
}

export async function fetchProducts(params = {}) {
  return proxyFetch('products', params);
}

export async function fetchStoreInfo() {
  return proxyFetch('store');
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
    investimento: 0,
    lucroBruto: faturamento,
    lucroSogra: faturamento,
    roas: 0,
    cpa: 0,
    vendas: totalVendas,
  };
}

// Build the Nuvemshop OAuth install URL for the connect button
export function getInstallUrl() {
  const storeAdminUrl = 'https://nacaoesportes2.lojavirtualnuvem.com.br';
  const appId = import.meta.env.VITE_NUVEMSHOP_APP_ID || '27805';
  return `${storeAdminUrl}/admin/apps/${appId}/authorize`;
}
