const Fastify = require("fastify")

// Create fastify instance outside the handler
const app = Fastify({
  logger: true,
});

// Register your plugins
app.register(import("../src/index.js"));

// Export the serverless function
module.exports = async function handler(req, res) {
  await app.ready();
  app.server.emit('request', req, res);
  
  return app;
}