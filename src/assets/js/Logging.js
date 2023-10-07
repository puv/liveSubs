/* eslint-disable no-undef */
const log = (...args) => {
	console.log(`[${prettyTime(Date.now() - startTimestamp)}]`, ...args);
};

const warn = (...args) => {
	console.warn(`[${prettyTime(Date.now() - startTimestamp)}]`, ...args);
};

const error = (...args) => {
	console.error(`[${prettyTime(Date.now() - startTimestamp)}]`, ...args);
};

function prettyTime(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let milliseconds_remainder = milliseconds % 1000;
	seconds %= 60;
	minutes %= 60;
	hours %= 24;
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds_remainder.toString().padStart(3, '0')}`;
}

export { log, warn, error };