import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
@WebSocketGateway(parseInt(process.env.WEB_SOCKET_PORT),{transports:['websocket']})
export class SocketGateway {
  @WebSocketServer() server;
}

