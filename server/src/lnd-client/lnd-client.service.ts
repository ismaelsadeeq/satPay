import { Injectable } from '@nestjs/common';
import createLnRpc, {LnRpc} from '@radar/lnrpc';
@Injectable()
export class LndClientService {
  node:LnRpc;
  constructor(
   
  ) {
  }
  async startNode() {
    try {
      this.node = await createLnRpc({
        server: process.env.LND_GRPC_URL,
        tls:process.env.LND_TLS_CERT,
        macaroonPath:process.env.LND_MACAROON
      })
    } catch (error) {
      throw new Error(error);
    }
  }

 
}

