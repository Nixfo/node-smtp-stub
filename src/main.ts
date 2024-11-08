import { ParsedMail, simpleParser } from 'mailparser';
import { SMTPServer } from 'smtp-server';
import { launchWebServer } from './web-server.js';

console.log('Running');

export const emails: ParsedMail[] = [];

const smtpServer = new SMTPServer({
    authOptional: true,
    onAuth(auth, _session, callback) {
        console.info(`Received auth from ${auth.username}`);
        callback(null, {
            user: auth.username,
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
