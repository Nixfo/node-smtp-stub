# smtp-stub
[![npm version](https://img.shields.io/npm/v/@nixfo/smtp-stub)](https://www.npmjs.com/package/@nixfo/smtp-stub)
![Build Status](https://img.shields.io/github/actions/workflow/status/Nixfo/node-smtp-stub/main.yml?branch=main)
[![Downloads](https://img.shields.io/npm/dm/@nixfo/smtp-stub)](https://www.npmjs.com/package/@nixfo/smtp-stub)

smtp-stub is a tool for simulating a SMTP server for development and automated testing environments.

## Features
- Simulate an SMTP server
- View received emails via a web interface
- Easy integration for automated tests

## Installation

### Install smtp-stub in your project in dev dependencies
```sh
npm i -D @nixfo/smtp-stub
```

### Install smtp-stub globally
```sh
npm i -g @nixfo/smtp-stub
```

## Usage

### Run the servers
```sh
npx @nixfo/smtp-stub
```

Then you will be able to :
- Send your emails to the SMTP port at `localhost:1025`.
- View your emails at `localhost:1024`.
- Clear your emails sending a DELETE request at `localhost:1024`.

### Use smtp-stub for automated tests
Construct your `SmtpStubServer` via the `SmtpStubBuilder`.
```ts
const smtpStub =
    new SmtpStubBuilder(1025, '0.0.0.0') // Port/host of the SMTP server
        .withWebServer(1024, '0.0.0.0')  // (optional) include a web server to visualize received emails
        .build();                        // Build and returns the object
```

Check the result
```ts
expect(smtpStub.emails.length).toBe(1);
```

If you want to close the servers
```ts
smtpStub.close();
```
