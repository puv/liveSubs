import { log } from './ConsoleHandler';

const handleTranslation = async (config, text) => {
	let targetLangs = config.translations.map((translation) => translation.lang);
	log('[ FINAL ]', text);
	switch (config.api.type) {
	case 'local':
		return translateLocal(config, text, targetLangs);
	case 'libre':
		return translateLibre(config, text, targetLangs);
	case 'google':
		return translateGoogle(config, text, targetLangs);
	case 'deepl':
		return translateDeepl(config, text, targetLangs);
	default:
		return null;
	}
};

/**
 * Translates given text using a local dictionary
 */
const translateLocal = async () => { };

/**
 * Translates given text using the LibreTranslate API
 * @param {Object} config 
 * @param {string} text 
 * @param {string[]} targetLangs 
 */
const translateLibre = async (config, text, targetLangs) => {
	let translations = [];
	for (let i = 0; i < targetLangs.length; i++) {
		let query = 'http://srv.puv.bar:5000/translate';
		let body = {
			q: text,
			source: config.sub.lang,
			target: targetLangs[i],
			format: 'text',
			api_key: ''
		};

		const response = await fetch(query, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		const data = await response.json();
		translations[targetLangs[i]] = data.translatedText;
	}
	return translations;
};


/**
 * Translates given text using the Google Translate API
 * @param {Object} config 
 * @param {string} text 
 * @param {string[]} targetLangs 
 */
const translateGoogle = async (config, text, targetLangs) => {
	let translations = [];
	for await (let lang of targetLangs) {
		let query;

		if (config.api.key.length != 0) {
			query = 'https://translation.googleapis.com/language/translate/v2?key=' + config.api.key + '&source=' + config.sub.lang + '&target=' + lang + '&q=' + encodeURI(text);
		} else {
			query = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + config.sub.lang + '&tl=' + lang + '&dt=t&q=' + encodeURI(text);
		}

		const response = await fetch(query);
		const data = await response.json();
		log('translateGoogle', `[${lang}]`, data);

		if (config.api.key.length != 0) {
			translations.push({
				lang: lang,
				text: data.data.translations[0].translatedText
			});
		} else {
			translations.push({
				lang: lang,
				text: data[0][0][0]
			});
		}
	}
	return translations;
};



/**
 * Translates given text using the DeepL API
 * @param {Object} config 
 * @param {string} text 
 * @param {string[]} targetLangs 
 */
const translateDeepl = async (config, text, targetLangs) => {
	let translations = [];
	if (config.api.key.length <= 0) return;
	for await (let lang of targetLangs) {
		let query = 'https://api-free.deepl.com/v2/translate?auth_key=' + config.api.key + '&text=' + encodeURI(text) + '&source_lang=' + config.sub.lang + '&target_lang=' + lang;

		const response = await fetch(query);
		const data = await response.json();
		log('translateDeepL', data);
		translations.push(data.translations[0].text);
	}
	return translations;
};


export default handleTranslation;