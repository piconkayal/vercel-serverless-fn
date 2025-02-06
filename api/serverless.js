import Fastify from "fastify";

// Create fastify instance outside the handler
const app = Fastify({
  logger: true,
});

// Register your plugins
await app.register(import("../src/app.js"));

// Wait for ready
await app.ready();

// Export the serverless function
export default async function handler(req, res) {
  await app.ready();
  
  // Convert the incoming message to a Node.js style request
  const nodeReq = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    raw: req
  };

  // Create a Node.js style response object
  const nodeRes = res;

  return new Promise((resolve, reject) => {
    app.server.emit('request', nodeReq, nodeRes);
    
    // Handle response completion
    nodeRes.on('finish', resolve);
    nodeRes.on('error', reject);
  });
}