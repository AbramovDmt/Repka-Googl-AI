/* Decap CMS: шаг 1 OAuth-входа через GitHub — перенаправляет на страницу авторизации GitHub.
   Env vars: OAUTH_GITHUB_CLIENT_ID */

export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) return res.status(500).end('OAuth не настроен: нет OAUTH_GITHUB_CLIENT_ID');

  const redirectUri = `https://${req.headers.host}/api/callback`;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.writeHead(302, { Location: authUrl });
  res.end();
}
