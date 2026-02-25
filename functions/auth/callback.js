export async function onRequestGet(context) {
    const { env, request } = context;
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
        return new Response('Missing code parameter', { status: 400 });
    }

    const clientId = env.GITHUB_CLIENT_ID;
    const clientSecret = env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return new Response('OAuth credentials not configured', { status: 500 });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { status: 400 });
        }

        const token = tokenData.access_token;
        const provider = 'github';

        // Return HTML that sends the token back to the CMS via postMessage
        const html = `<!DOCTYPE html>
<html>
<head><title>OAuth Callback</title></head>
<body>
<script>
(function() {
  function sendMessage(message) {
    const opener = window.opener;
    if (opener) {
      opener.postMessage(
        'authorization:${provider}:success:' + JSON.stringify({ token: '${token}', provider: '${provider}' }),
        window.location.origin
      );
    }
  }
  sendMessage();
  window.close();
})();
</script>
<p>Authenticating... This window should close automatically.</p>
</body>
</html>`;

        return new Response(html, {
            headers: { 'Content-Type': 'text/html;charset=UTF-8' },
        });
    } catch (error) {
        return new Response(`Authentication failed: ${error.message}`, { status: 500 });
    }
}
