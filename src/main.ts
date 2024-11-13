#!/usr/bin/env node
import { ParsedMail } from 'mailparser';
import { launchSmtpStubServer } from './smtp-server.js';
import { launchWebServer } from './web-server.js';

export const emails: ParsedMail[] = [];

launchSmtpStubServer(1025, '0.0.0.0');
launchWebServer(1024, '0.0.0.0');
