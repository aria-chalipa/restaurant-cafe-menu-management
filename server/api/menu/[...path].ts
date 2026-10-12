export default defineEventHandler((event) => {
  const path = getRouterParam(event, 'path') ?? '';
  // same-origin proxy so the browser never talks cross-port to json-server (avoids its missing CORS headers)
  return proxyRequest(event, `http://localhost:3001/${path}`);
});
