import { Injectable } from '@nestjs/common';



@Injectable()
export class LnurlService {
  private lnurl = require('lnurl');

  public lnurlServer = this.lnurl.createServer({
    host:'localhost',
    url: process.env.SERVER_URL,
    port: process.env.NURL_PORT,
    endpoint: "/api/v1/auth/lnurl",
    auth: {
      apiKeys: [],
    },
    lightning: {
    backend: 'lnd',
    config: {
      hostname: process.env.LND_GRPC_URL,
      cert: process.env.LND_TLS_CERT,
      macaroon: process.env.LND_MACAROON
    }
  },
    store: {
      backend: 'memory',
    },
  })

}
