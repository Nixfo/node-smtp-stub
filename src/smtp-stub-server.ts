import path from 'node:path';
import fastifyView from '@fastify/view';
import { Eta } from 'eta';
import Fastify from 'fastify';
import { ParsedMail, simpleParser } from 'mailparser';
import { SMTPServer } from 'smtp-server';

export class SmtpStubServer {
    readonly emails: ParsedMail[] = [];

    constructor(port: number, host: string) {
        const smtpServer = new SMTPServer({
            authOptional: true,
            onAuth: (auth, _session, callback) => {
                console.info(`Received auth from ${auth.username}`);
                callback(null, {
                    user: auth.username,
                });
            },
            onData: (stream, session, callback) => {
                console.log(`Received data from ${session.clientHostname} (${stream.byteLength} bytes)`);
                simpleParser(stream)
                    .then((email) => {
                        console.log(`Received email ${email.html}`);
                        this.emails.push(email);
                        callback();
                    }, callback)
                    .catch((e) => {
                        throw new Error('Parsing error', e);
                    });
            },
        });

        smtpServer.on('error', (err) => {
            console.error(err);
        });

        smtpServer.listen(port, host);
    }

    async launchWebServer(port: number, host: string) {
        const fastify = Fastify({
            logger: true,
        });

        fastify.register(fastifyView, {
            engine: {
                eta: new Eta(),
            },
            templates: path.join(__dirname, 'templates'),
        });

        fastify.get('/', async (_request, reply) => {
            return reply.viewAsync('ui.html', { emails: this.emails });
        });

        fastify.delete('/', async (_request, _reply) => {
            this.emails.length = 0;
        });

        try {
            await fastify.listen({ host, port });
        } catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
}

export class SmtpStubBuilder {
    private smtpStubServer: SmtpStubServer;

    constructor(port: number, host: string) {
        this.smtpStubServer = new SmtpStubServer(port, host);
    }

    withWebServer(port: number, host: string): SmtpStubBuilder {
        this.smtpStubServer.launchWebServer(port, host);
        return this;
    }

    build(): SmtpStubServer {
        return this.smtpStubServer;
    }
}
