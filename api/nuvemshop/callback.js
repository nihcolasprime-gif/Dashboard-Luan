// Vercel Serverless Function - Nuvemshop OAuth Callback
// URL: https://dashboard-luan.vercel.app/api/nuvemshop/callback
// This URL must be set as the "Redirect URL after installation" in Nuvemshop Partners panel.

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.redirect(302, '/?nuvem_error=missing_code');
  }

  const appId = process.env.VITE_NUVEMSHOP_APP_ID;
  const clientSecret = process.env.VITE_NUVEMSHOP_CLIENT_SECRET;

  try {
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: appId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('Nuvemshop token error:', tokenData);
      return res.redirect(302, `/?nuvem_error=${encodeURIComponent(tokenData.error || 'token_error')}`);
    }

    // Save token in env for now and redirect back to dashboard with token info
    // In a full production setup, this would be saved to Supabase.
    const redirectUrl = `/?nuvem_token=${encodeURIComponent(tokenData.access_token)}&nuvem_user_id=${tokenData.user_id}&nuvem_success=1`;
    return res.redirect(302, redirectUrl);

  } catch (err) {
    console.error('Unexpected error in Nuvemshop callback:', err);
    return res.redirect(302, '/?nuvem_error=server_error');
  }
}
