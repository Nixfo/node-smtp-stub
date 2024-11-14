import * as nodemailer from 'nodemailer';
import { describe, expect, test } from 'vitest';
import { SmtpStubBuilder, SmtpStubServer } from '.';

const transporter = nodemailer.createTransport({
    host: '0.0.0.0',
    port: 1025,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: 'nodemailer@example.email',
        pass: 'jn7jnAPss4f63QBp6D',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function sendMail() {
    return transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <nodemailer@example.email>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
    });
}

describe('SmtpStubServer with web server', () => {
    const smtpStub: SmtpStubServer = new SmtpStubBuilder(1025, '0.0.0.0').withWebServer(1024, '0.0.0.0').build();

    test('sending an mail', async () => {
        await sendMail().catch(console.error);

        expect(smtpStub.emails).length(1);
    });

    test('delete an email', async () => {
        await sendMail().catch(console.error);

        await fetch('http://localhost:1024', {
            method: 'DELETE',
        });

        expect(smtpStub.emails).length(0);
    });
});
