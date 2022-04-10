# Restaurant Reviews

This requires Node v14.  (One of the React libraries doen't yet support Node 16, so it requires Node 14)


## Setup and Run

1.  Use Node v14, to install the dependencies.
2.  Run MongoDB locally, and/or configure a hostname, port, and db name in `server/.env` file
3.  Run the commands below one to install the dependencies first.  Then use `npm run dev` from the root folder to start both the server and client apps together)

## Setup and Install

NOTE: use Node v14

If using `nvm` to manage node verisons, run `nvm use 14` before the following commands
```
npm install
npm run install-client
npm run install-server

cp server/.env.example server/.env
```

## Run

From the root directory, just run the following script which will run both the server and client apps in the same command.
```
npm run dev
```

By default, the client will run on port 3000 and the server on port 4000.



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
13. Try to access pages while logged out (/restaurants)
14. Try to access pages that don't exist (/nothing)


## Notes
* To increase the login sesison validity, we can increase the `JWT_ACCESS_EXPIRATION_MINUTES` value in the `server/.env` file.

