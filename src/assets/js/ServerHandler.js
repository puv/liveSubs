import { err, log, warn } from './ConsoleHandler.js';

import getConfig from './ConfigHandler.js';

let ws;

if (getConfig().server != 'off') {
	try {
		ws = new WebSocket(getConfig().server === 'local' ? 'ws://localhost:11117' : 'ws://srv.puv.bar:11117');

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

function wsSend(type, data) {
	if (ws.OPEN) {
		console.log('Sending', type, data);
		ws.send(JSON.stringify({
			type: type,
			data: data
		}));
	}
}

export default ws;

export { wsSend };