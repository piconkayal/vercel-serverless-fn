import Fastify from "fastify";

// Create fastify instance outside the handler
const app = Fastify({
  logger: true,
});

// Register your plugins
await app.register(import("../src/app.mjs"));

// Wait for ready
// await app.ready();

// Export the serverless function
export default async function handler(req, res) {
  await app.ready();
   app.server.emit('request', req, res);
  return app;
}