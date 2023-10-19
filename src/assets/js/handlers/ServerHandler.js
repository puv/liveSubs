/* eslint-disable no-undef */

import { err, log, warn } from './ConsoleHandler.js';

import { getConfig } from './ConfigHandler.js';
import { invoke } from '@tauri-apps/api/tauri';

let ws;

function connect() {
	try {
		ws = new WebSocket('ws://localhost:11117');

		
		ws.onopen = () => {
			log('Connection established');
		};

		ws.onclose = (e) => {
			warn('Connection closed', e);
			setTimeout(location.reload(), 1000);
		};

		ws.onerror = (e) => {
			err('Connection error', e);
			setTimeout(location.reload(), 1000);
		};

		return ws;
	} catch (e) {
		err('WebSocket error', e);
		setTimeout(location.reload(), 1000);
	}
}

if (isClient) ws = connect();

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