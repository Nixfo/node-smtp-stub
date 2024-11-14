import path from 'node:path';
import fastifyView from '@fastify/view';
import { Eta } from 'eta';
import Fastify from 'fastify';
import { getEmails, resetEmails } from './main';

// Get the current directory with ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export async function launchWebServer(port: number, host: string) {
    const fastify = Fastify({
        logger: true,
    });

    fastify.register(fastifyView, {
        engine: {
            eta: new Eta(),
        },
        templates: path.join(__dirname, 'templates'),
    });

    fastify.get('/', async function handler(_request, reply) {
        return reply.viewAsync('ui.html', { emails: getEmails() });
    });

    fastify.delete('/', async function handler(_request, _reply) {
        resetEmails();
    });

    try {
        await fastify.listen({ host, port });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
