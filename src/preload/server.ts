/* eslint-disable @typescript-eslint/no-var-requires */
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({ port: 11117 });

let Client: WebSocket | undefined = undefined;

wss.on('connection', function connection(ws) {
	console.log(`Connection from ${ws._socket.remoteAddress}`);

	ws.on('message', function incoming(message) {
		const msg = JSON.parse(message.toString() as string);
		console.log(`Received message from ${ws._socket.remoteAddress}`, msg);
		if (msg.type == 'client_init') {
			Client = ws;
			console.log(`Client ${ws._socket.remoteAddress} connected`);
		}
		else if (Client != undefined) {
			switch (msg.type) {
			case 'config':
				Client.send(JSON.stringify({ type: 'config', data: msg.data }));
				break;
			case 'speech':
				Client.send(JSON.stringify({ type: 'speech', data: msg.data }));
				break;
			default:
				console.log(`Unknown message type: ${msg.type}`);
				Client.send(JSON.stringify({ type: 'error', data: 'Unknown message type' }));
				break;
			}
		}
	});
});

wss.on('listening', function listening() {
	console.log('ok, listening');
});

wss.on('error', function error(err: unknown) {
	console.log('error: %s', err);
});

export {
	wss,
	Client as WSClient
};