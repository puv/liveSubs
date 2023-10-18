import { err, log, warn } from './ConsoleHandler.js';

import { getConfig } from './ConfigHandler.js';

let ws;

if (window.location.pathname.includes('client')) {
	try {
		ws = new WebSocket('wss://localhost:11117');

		ws.onopen = () => {
			log('Connection established');
		};

		ws.onclose = (e) => {
			warn('Connection closed', e);
		};

		ws.onerror = (e) => {
			err('Connection error', e);
		};

	} catch (e) {
		err('WebSocket error', e);
	}
}

function wsSendToServer(type, data) {
	try {
		if (getConfig().server && ws.OPEN) {
			log('STS', type, data);
			ws.send(JSON.stringify({
				type: type,
				data: data
			}));
		}
	} catch (e) {
		err('STS error', e);
	}
}

function wsSendToClient(type, data) {
	log('STC', type, data);
	try {
		if (window.ws.WSClient) window.ws.WSClient.send(JSON.stringify( { type: type, data: data } ));
	} catch (e) {
		err('STC error', e);
	}
}

export default ws;

export { wsSendToServer, wsSendToClient };