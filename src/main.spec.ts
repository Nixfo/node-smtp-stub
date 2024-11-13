import * as nodemailer from 'nodemailer';
import { expect, test } from 'vitest';
import { emails } from './main.js';

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

test('sending an mail', async () => {
    await sendMail().catch(console.error);

    expect(emails).length(1);
});

test('delete an email', async () => {
    await sendMail().catch(console.error);

    await fetch('http://localhost:1024', {
        method: 'DELETE',
    });

    expect(emails).length(0);
});
