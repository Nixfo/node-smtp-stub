import { ParsedMail, simpleParser } from 'mailparser';
import { SMTPServer } from 'smtp-server';
import Fastify from 'fastify';

export async function launchWebServer(port: number, host: string) {
    const fastify = Fastify({
        logger: true,
    });

    // Declare a route
    fastify.get('/', async function handler(_request, _reply) {
        return { mailCount: emails.length };
    });

    try {
        await fastify.listen({ host, port });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

console.log('Running');

export const emails: ParsedMail[] = [];

const smtpServer = new SMTPServer({
    authOptional: true,
    onAuth(auth, _session, callback) {
      console.info(`Received auth from ${auth.username}`);
      callback(null, {
        user: auth.username
      });
    },
    onData(stream, session, callback) {
        console.log(`Received data from ${session.clientHostname} (${stream.byteLength} bytes)`);
        simpleParser(stream)
            .then((email) => {
                console.log(`Received email ${email.html}`);
                emails.push(email);
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

smtpServer.listen(1025, 'localhost');
launchWebServer(1024, 'localhost');

//TODO Fastisfy server in a separate file
//TODO Fastisfy should serve an HTML template
