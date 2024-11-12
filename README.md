# smtp-stub
This project is intended to be used for development purpose only, to simulate a SMTP server and view the received emails.

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