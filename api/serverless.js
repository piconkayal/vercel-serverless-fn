import "dotenv/config";
import Fastify from "fastify";

console.log(1);

const app = Fastify({
  logger: true,
});

console.log(2);

app.register(import("../src/app.js"));

console.log(3);

export default async (req, res) => {
  console.log(4);
  await app.ready();
  console.log(5);
  app.server.emit("request", req, res);
};
