import { err, log, warn } from './Logging.js';

const ws = new WebSocket('ws://srv.puv.bar:11117');

ws.onopen = () => {
	log('Connection established');
};

ws.onclose = (e) => {
	warn('Connection closed', e);
};

ws.onerror = (e) => {
	err('Connection error', e);
};

function wsSend(type, data) {
	if (ws.OPEN) {
		ws.send(JSON.stringify({ 
			type: type,
			data: data
		}));
	}
}

export default wsSend;