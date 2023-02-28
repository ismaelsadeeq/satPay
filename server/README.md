# Satpay [nestjs](https://nestjs.com/) server.
It's expected that software dependencies were installed.


# Server Configuration
- It is expected that [nodejs](https://nodejs.org/en/download/) and node package manager is istalled.
- Create a .env file.
- Copy the variables in the .envexample to the .env file
- Fill the necessary information
  - PORT the port you want your nestjs to listen to default is 3000
  - SECRET is the json web token authentication secret key.
  - LND_GRPC_URL is the rpc url of you lnd the host:port
  - LND_MACAROON is the path to the admin macaroon file in the host, lnd will authenticate the node server with the macaroon file.
  - LND_TLS_CERT is e path to the tls certificate file in the host 
  - WEB_SOCKET_PORT is the host port web socket will listen to, in other to connect to new clients.


[Learn more about macaroon in LND](https://github.com/lightningnetwork/lnd/tree/master/macaroons)
[Learn more about web socket](https://socket.io/docs/v4/)


## Installation Guide

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



