export default {
  async fetch(request, env, ctx) {
    // Configure in Cloudflare dashboard or wrangler.toml
    // e.g. env.TARGET_API_ORIGIN = 'https://api.mexsuweb.com'
    const targetOrigin = env.TARGET_API_ORIGIN;
    if (!targetOrigin) {
      return new Response('Worker misconfigured: TARGET_API_ORIGIN not set', { status: 500 });
    }

    const url = new URL(request.url);
    // Only proxy /api/*
    if (!url.pathname.startsWith('/api/')) {
      return fetch(request); // passthrough
    }

    // Rewrite to target origin
    const targetUrl = new URL(url.pathname + url.search, targetOrigin);

    // Clone request with new URL and preserve method, headers, and body
    const init = {
      method: request.method,
      headers: new Headers(request.headers),
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
    };

    // Optional: Forward client IP
    init.headers.set('x-forwarded-host', url.host);
    init.headers.set('x-forwarded-proto', url.protocol.replace(':',''));

    const resp = await fetch(targetUrl.toString(), init);

    // Optionally adjust CORS if needed
    const responseHeaders = new Headers(resp.headers);
    // responseHeaders.set('access-control-allow-origin', url.origin);

    return new Response(resp.body, { status: resp.status, headers: responseHeaders });
  },
};
