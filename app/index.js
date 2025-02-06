module.exports = async (fastify, options) => {
  fastify.get("/test", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/", async (request, reply) => {
    return { john: "doe" };
  });
};
