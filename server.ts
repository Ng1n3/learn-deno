const PORT = 5000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === 'GET' && path === '/') {
    return new Response('Hello world');
  } else if (req.method == 'POST' && path === '/api/todos') {
  } else if (req.method === 'GET' && path === '/api/todo') {
  } else if (req.method === 'GET' && path === '/api/todos/incomplete/count') {
  } else if (req.method === 'GET' && path.startsWith('/api/todos')) {
  } else if (req.method === 'PUT' && path.startsWith('api/todos')) {
  } else if (req.method === 'DELETE' && path.startsWith('/api/todos')) {
  }
  return new Response('Not found', { status: 404 });
}

console.log(`HTTP server is runing on http://localhost$${PORT}`);
Deno.serve({ port: PORT }, handler);
