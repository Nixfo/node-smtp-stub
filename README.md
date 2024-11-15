# smtp-stub
This project is intended to be used for development purpose only, to simulate a SMTP server and view the received emails. It also contains utilities for easy automated testing.

## Usage
### Install smtp-stub in your project in dev dependencies
`npm i -D @nixfo/smtp-stub`

### Install smtp-stub globally
`npm i -g @nixfo/smtp-stub`

### Run the servers
`npx @nixfo/smtp-stub`

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
