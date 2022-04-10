# Restaurant Reviews

This requires Node v 14, as one of the client packages doesn't yet support v16.


## Dev Run

1.  Use Node v14, to install the dependencies.
2.  Run MongoDB locally, and/or configure a hostname, port, and db name in `server/.env`
3.  Run the `dev` script in the root directory, and this will start:
    1.  client on port 3000
    2.  server on port 4000

```
# use Node v14
# If using NVM, run:  nvm use 14

npm install
npm run install-client
npm run install-server

npm run dev
```