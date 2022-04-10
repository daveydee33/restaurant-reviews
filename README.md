# Restaurant Reviews

This requires Node v 14, as one of the client packages doesn't yet support v16.


## Setup and Run

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

cp server/.env.example server/.env

npm run dev
```

## Usage Tests

1. Register a user at: http://localhost:3000/register
2. Login at: http://localhost:3000/login
3. Add Restaurants
4. Edit Restaurants
5. Delete Restaurants
6. Add Reviews
7. Edit Reviews
8. Delete Reviews
9. Create additional users within the dashboard.  (use Admin account)
   1.  Create an Admin
   2.  Create a User
10. Login with User account and test features
11. Login with Admin account and test features
12. Try to access forbidden routes (/users) from a non-admin account
13. Try to access pages while logged out
14. Try to access pages that don't exist


## Known Issues
* The login session expires after 30 minutes, and do not automatically refresh.
* 