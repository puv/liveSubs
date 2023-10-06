/**
 * Access to BouyomiChan WebSocket Server
 */
const HOST = 'localhost';
const PORT = 50002;  // WebSocketサーバー経由

/**
 * BouyomiChanClient Class
 */
const BouyomiChanClient = function () {
};

/**
 * Reads given text out loud
 * @param {string} text 
 */
BouyomiChanClient.prototype.talk = function (text) {
	this.text = text;
	let _socket = new WebSocket('ws://' + HOST + ':' + PORT + '/ws/');
	this.socket = _socket;
	this.socket.binaryType = 'arraybuffer';
	this.socket.onopen = this.socket_onopen.bind(this);
	this.socket.onerror = this.socket_onerror.bind(this);
	this.socket.onclose = this.socket_onclose.bind(this);
	this.socket.onmessage = this.socket_onmessage.bind(this);
};


/**
 * On WebSocket Opened
 */
BouyomiChanClient.prototype.socket_onopen = function () {
	let data = this.makeBouyomiChanDataToSend(this.text);
	console.log('socket_onopen', data);
	this.socket.send(data.buffer);
};


/**
 * On WebSocket Error
 */
BouyomiChanClient.prototype.socket_onerror = function () {
	console.log('socket_onerror');

	this.socket.close();
};

/**
 * On WebSocket Closed
 */
BouyomiChanClient.prototype.socket_onclose = function () {
	console.log('socket_onclose');
};

/**
 * On WebSocket Message
 */
BouyomiChanClient.prototype.socket_onmessage = function (e) {
	console.log('socket_onmessage', e.data);

	this.socket.close();
};


/**
 * Generate data to send to BouyomiChan
 * @param {string} text 
 * @returns data
 */
BouyomiChanClient.prototype.makeBouyomiChanDataToSend = function (text) {
	let command = 0x0001;	//[0-1]		(16Bit)		Command			(0: Message Reading)
	let speed = -1;			//[2-3]		(16Bit)		Speed				(-1: Settings on the Reader Screen)
	let tone = -1;			//[4-5]		(16Bit)		Pitch				(-1: Settings on the Reader Screen)
	let volume = -1;		//[6-7]		(16Bit)		Volume				(-1: Settings on the Reader Screen)
	let voice = 0;			//[8-9]		(16Bit)		Voice
	/*
		0: Settings on the Reader Screen,
		1: Female 1, 
		2: Female 2, 
		3: Male 1, 
		4: Male 2, 
		5: Neutral, 
		6: Robot, 
		7: Machine 1, 
		8: Machine 2
	*/													
	let code = 0; 			//[10]		(8Bit)		Text encoding 
	/*
		0:UTF-8, 
		1:Unicode, 
		2:Shift-JIS
	*/
	let len = 0; 			//[11-14]	(32Bit)		Text length

	let textByteArray = stringToUtf8ByteArray(text);

	len = textByteArray.length;
	let bytesLen = 2 + 2 + 2 + 2 + 2 + 1 + 4 + textByteArray.length;
	let data = new Uint8Array(bytesLen);
	let pos = 0;
	data[pos++] = command & 0xFF;
	data[pos++] = (command >> 8) & 0xFF;
	data[pos++] = speed & 0xFF;
	data[pos++] = (speed >> 8) & 0xFF;
	data[pos++] = tone & 0xFF;
	data[pos++] = (tone >> 8) & 0xFF;
	data[pos++] = volume & 0xFF;
	data[pos++] = (volume >> 8) & 0xFF;
	data[pos++] = voice & 0xFF;
	data[pos++] = (voice >> 8) & 0xFF;
	data[pos++] = code & 0xFF;
	data[pos++] = len & 0xFF;
	data[pos++] = (len >> 8) & 0xFF;
	data[pos++] = (len >> 16) & 0xFF;
	data[pos++] = (len >> 24) & 0xFF;
	for (let i = 0; i < textByteArray.length; i++) {
		data[pos++] = textByteArray[i];
	}
	return data;
};

/**
 * Convert string to UTF-8 byte array
 * @param {string} str 
 * @returns UTF-8 byte array
 */
function stringToUtf8ByteArray(str) {
	let out = [], p = 0;
	for (var i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		if (c < 128) {
			out[p++] = c;
		}
		else if (c < 2048) {
			out[p++] = (c >> 6) | 192;
			out[p++] = (c & 63) | 128;
		}
		else if (
			((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
            ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {

			// Surrogate Pair
			c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
			out[p++] = (c >> 18) | 240;
			out[p++] = ((c >> 12) & 63) | 128;
			out[p++] = ((c >> 6) & 63) | 128;
			out[p++] = (c & 63) | 128;
		}
		else {
			out[p++] = (c >> 12) | 224;
			out[p++] = ((c >> 6) & 63) | 128;
			out[p++] = (c & 63) | 128;
		}
	}
	return out;
}

export default BouyomiChanClient;