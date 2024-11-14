#!/usr/bin/env node
import { ParsedMail } from 'mailparser';
import { launchSmtpStubServer } from './smtp-server.js';
import { launchWebServer } from './web-server.js';

const emails: ParsedMail[] = [];

export function pushEmails(email: ParsedMail): void {
    emails.push(email);
}

export function getEmails(): ParsedMail[] {
    return emails;
}

export function resetEmails(): void {
    emails.length = 0;
}

launchSmtpStubServer(1025, '0.0.0.0');
launchWebServer(1024, '0.0.0.0');
