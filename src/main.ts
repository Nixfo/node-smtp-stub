#!/usr/bin/env node
import { SmtpStubBuilder } from './smtp-stub-server';

new SmtpStubBuilder(1025, '0.0.0.0').withWebServer(1024, '0.0.0.0').build();
