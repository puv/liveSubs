import { err, log, warn } from './ConsoleHandler.js';

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
		console.log('Sending', type, data);
		ws.send({ 
			type: type,
			data: data
		});
	}
}

export default ws;

export { wsSend };