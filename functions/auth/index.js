export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);
    const provider = url.searchParams.get('provider') || 'github';
    const siteId = url.searchParams.get('site_id') || '';

    if (provider !== 'github') {
        return new Response('Unsupported provider', { status: 400 });
    }

    const clientId = env.GITHUB_CLIENT_ID;
    if (!clientId) {
        return new Response('GITHUB_CLIENT_ID not configured', { status: 500 });
    }

    const scope = 'repo,user';
    const redirectUri = `${url.origin}/auth/callback`;

    const state = btoa(JSON.stringify({ provider, site_id: siteId }));

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

    return Response.redirect(authUrl, 302);
}
