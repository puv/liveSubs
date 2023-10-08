/* eslint-disable no-undef */
let logCss = 'background-color: #348fff; padding-inline: 6px; padding-block: 4px; border-radius: 4px; color: white; font-weight: bold';
let warnCss = 'background-color: #ff9f00; padding-inline: 6px; padding-block: 4px; border-radius: 4px; color: white; font-weight: bold';
let errCss = 'background-color: #ff0000; padding-inline: 6px; padding-block: 4px; border-radius: 4px; color: white; font-weight: bold';
let reset = 'background-color: transparent; color: unset; font-weight: unset';

const log = (...args) => {
	console.log(`%c${prettyTime(Date.now() - startTimestamp)}%c`, logCss, reset, ...args);
};

const warn = (...args) => {
	console.log(`%c${prettyTime(Date.now() - startTimestamp)}%c`, warnCss, reset, ...args);
};

const err = (...args) => {
	console.log(`%c${prettyTime(Date.now() - startTimestamp)}%c`, errCss, reset, ...args);
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

export { log, warn, err };