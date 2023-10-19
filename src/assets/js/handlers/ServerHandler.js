import { err, log, warn } from './ConsoleHandler.js';

import { getConfig } from './ConfigHandler.js';
import { invoke } from '@tauri-apps/api/tauri';

let ws;

if (isClient) {
	try {
		ws = new WebSocket('ws://localhost:11117');

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
		invoke('send_to_client', {
			message: JSON.stringify({
				type: type,
				data: data
			})
		});
	} catch (e) {
		err('STC error', e);
	}
}

export default ws;

export { wsSendToServer, wsSendToClient };