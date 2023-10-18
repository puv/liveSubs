/* eslint-disable @typescript-eslint/no-var-requires */
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({ port: 11117 });

let Client: WebSocket | undefined = undefined;

const homeAddresses = [
	'::1'
];

wss.on('connection', function connection(ws) {
	console.log(`Connection from ${ws._socket.remoteAddress}`);
	if (homeAddresses.includes(ws._socket.remoteAddress)) Client = ws;
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