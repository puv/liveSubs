import $ from 'jquery';
import { log } from './ConsoleHandler';

const handleTranslation = (config, text) => {
	let targetLangs = config.translations.map((translation) => translation.lang);
	log('[ FINAL ]', text);
	switch (config.api.type) {
	case 'local':
		translateLocal(config, text, targetLangs);
		break;
	case 'libre':
		translateLibre(config, text, targetLangs);
		break;
	case 'google':
		translateGoogle(config, text, targetLangs);
		break;
	case 'deepl':
		translateDeepl(config, text, targetLangs);
		break;
	default:
		break;
	}
};

/**
 * Translates given text using a local dictionary
 */
const translateLocal = () => {};

/**
 * Translates given text using the LibreTranslate API
 * @param {Object} config 
 * @param {string} text 
 * @param {string[]} targetLangs 
 */
const translateLibre = (config, text, targetLangs) => {
	for (let i = 0; i < targetLangs.length; i++) {
		let request = new XMLHttpRequest();

		let query = 'http://srv.puv.bar:5000/translate';
		let body = {
			q: text,
			source: config.sub.lang,
			target: targetLangs[i],
			format: 'text',
			api_key: ''
		};

		request.open('POST', query, true);

		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify(body));

		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				let response = JSON.parse(request.responseText);
				let translation = response.translatedText;
				$(`#TFg[data-tr="${i}"]`)[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
				$(`#TBg[data-tr="${i}"]`)[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
			}
		};
	}
};

/**
 * Translates given text using the Google Translate API
 * @param {Object} config 
 * @param {string} text 
 * @param {string[]} targetLangs 
 */
const translateGoogle = (config, text, targetLangs) => {
	for (let i = 0; i < targetLangs.length; i++) {
		let request = new XMLHttpRequest();
		let query;

		if (config.api.key.length != 0) {
			query = 'https://translation.googleapis.com/language/translate/v2?key=' + config.api.key + '&source=' + config.sub.lang + '&target=' + targetLangs[i] + '&q=' + encodeURI(text);
		} else {
			query = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + config.sub.lang + '&tl=' + targetLangs[i] + '&dt=t&q=' + encodeURI(text);
		}
		request.open('GET', query, true);

		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				let response = JSON.parse(request.responseText);
				let translation;
				log('translateGoogle', `[${targetLangs[i]}]`, response);
				if (config.api.key.length != 0) {
					translation = response.data.translations[0].translatedText;
				} else {
					translation = response[0][0][0];
				}
				$(`#TFg[data-tr="${i}"]`)[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
				$(`#TBg[data-tr="${i}"]`)[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
			}
		};
		request.send(null);
	}
};


/**
 * Translates given text using the DeepL API
 * @param {Object} config 
 * @param {string} text 
 * @param {string[]} targetLangs 
 */
const translateDeepl = (config, text, targetLangs) => {
	if (config.api.key.length <= 0) return;
	for (let i = 0; i < targetLangs.length; i++) {
		let request = new XMLHttpRequest();
		let query = 'https://api-free.deepl.com/v2/translate?auth_key=' + config.api.key + '&text=' + encodeURI(text) + '&source_lang=' + config.sub.lang + '&target_lang=' + targetLangs[0];
        
		request.open('GET', query, true);
        
		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				let response = JSON.parse(request.responseText);
				log('translateDeepL', response);
				let translation = response.translations[0].text;
				$(`#TFg[data-tr=${i}]`)[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
				$(`#TBg[data-tr=${i}]`)[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
			}
		};
		request.send(null);
	}
};

export default handleTranslation;