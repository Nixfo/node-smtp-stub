import { simpleParser } from 'mailparser';
import { SMTPServer } from 'smtp-server';

console.log('Running');

const smtpServer = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        console.log(`received data from ${session.clientHostname} (${stream.byteLength} bytes)`);
        simpleParser(stream)
            .then((email) => {
              console.log(`received email ${email.html}`);
            })
            .catch((e) => {
                throw new Error('Parsing error', e);
            });
        callback();
    },
});

smtpServer.listen(1025, 'localhost');
