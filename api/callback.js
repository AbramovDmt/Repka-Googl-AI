/* Decap CMS: шаг 2 OAuth-входа через GitHub — обменивает code на токен, отдаёт его окну CMS.
   Env vars: OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET */

export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).end('OAuth не настроен: нет OAUTH_GITHUB_CLIENT_ID/OAUTH_GITHUB_CLIENT_SECRET');
    return;
  }
  if (!code) {
    res.status(400).end('Нет кода авторизации от GitHub');
    return;
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = await tokenRes.json();

  if (data.error) {
    res.status(401).setHeader('Content-Type', 'text/html').end(renderScript('error', { message: data.error_description || data.error }));
    return;
  }

  res.status(200).setHeader('Content-Type', 'text/html').end(renderScript('success', { token: data.access_token, provider: 'github' }));
}

function renderScript(status, content) {
  return `<script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          e.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script>`;
}
