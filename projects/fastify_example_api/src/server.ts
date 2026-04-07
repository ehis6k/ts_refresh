import Fastify from "fastify";

const app = Fastify({
    logger: true,
});

app.get("/health_check", async() => ({
    ok: true
}));

// ------------------------
const port = Number(process.env.PORT ?? 3000);

await app.listen({port, host: "127.0.0.1"}); 
