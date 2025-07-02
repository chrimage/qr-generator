export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle static assets
    const asset = await env.ASSETS.fetch(request);
    
    // If asset exists, return it
    if (asset.status !== 404) {
      return asset;
    }
    
    // For SPA routing, serve index.html for all routes that don't match assets
    if (!url.pathname.includes('.')) {
      const indexRequest = new Request(new URL('/', request.url), request);
      return env.ASSETS.fetch(indexRequest);
    }
    
    // Return 404 for missing assets
    return new Response('Not Found', { status: 404 });
  }
};