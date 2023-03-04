# Satpay

A Web server that enables businesses to create bitcoin lightning invoices for a service or product to their customers, receive and track bitcoin payments.

 - Features
  - Generating bolt11 lightning invoices for user customers.
  - Set expiry and timer for the invoice generated.
  - Notify and increment user balance after an invoice is paid through a web socket event.
  - Enable user to withdraw balance sats to any bolt11 invoice. 
  - Enable user to see transactions history for paid invoices and withdrawals.
  - Authentication, Authorization and identification of users.

[API Endpoints, required data payload, and the endpoint methods are documented in postman here](https://documenter.getpostman.com/view/13325800/2s93CRLrsi) 

## Satpay server application
- Server application is built with [Nestjs](https://docs.nestjs.com/) (Typescript) ❤️


### Software Dependencies needed to run this explorer
- [Lnd lightning node](https://github.com/lightningnetwork/lnd)
  - Note: The Lnd needs to be connected a bitcoin node and has a channel with a well connected node with some liquidity

- Mongo DB database either remote or local.


Server application is inside the server folder,
[Follow the installation guide in the folder readme for seamless installation](https://github.com/ismaelsadeeq/block-explorer/tree/main/client#installation-guide)



This project is built during [Qala](https://qala.dev) bitcoin development training cohort, a program training African software engineers transitioning to bitcoin and open source software development.
 

## Stay in touch

Twitter 
- [@Qala](https://twitter.com/QalaAfrica)
- [@Abubakar Sadiq Ismail](https://twitter.com/sadeeq_ismaela)

## License

Sat pay is licenced [MIT licensed](LICENSE).

Feel free to create a PR for improvement or open an issue if you encounter one.

Happy Hacking ❤️ 
