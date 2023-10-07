import $ from 'jquery';
import BouyomiChanClient from './BouyomiChanClient';
import Dictionary from './Dictionary';
import getConfig from './Config';

const handleAudio = (config) => {
	console.log('handleAudio');
    
	try {
		config = JSON.parse(atob(localStorage.getItem('config')));
	} catch (e) {
		localStorage.setItem('config', btoa(JSON.stringify(getConfig)));
		window.location.reload();
	}
	let VoiceRecognition;
	try {
		// eslint-disable-next-line no-undef
		VoiceRecognition = new webkitSpeechRecognition();
	} catch (e) {
		window.alert(Dictionary['browser_not_supported'][config.lang]);
		window.location.reload();
	}
	
	VoiceRecognition.continuous = true;
	VoiceRecognition.interimResults = true;
	VoiceRecognition.lang = config.sub.lang;
	useAudioDevice(config);
	VoiceRecognition.start();

	let init = false;

	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	VoiceRecognition.onstart = () => {
		// console.log('onStart', VoiceRecognition, e);
		config = JSON.parse(atob(localStorage.getItem('config')));
	};
	VoiceRecognition.onaudiostart = (e) => {
		console.log('onAudioStart', VoiceRecognition, e);
		init = true;
		if (localStorage.getItem('config') != btoa(JSON.stringify(config))) {
			config = JSON.parse(atob(localStorage.getItem('config')));
			VoiceRecognition.lang = config.sub.lang;
			VoiceRecognition.stop();
		}
	};
	// VoiceRecognition.onsoundstart = (e) => console.log('onSoundStart', VoiceRecognition, e);
	VoiceRecognition.onspeechstart = (e) => console.log('onSpeechStart', VoiceRecognition, e);
	VoiceRecognition.onspeechend = (e) => console.log('onSpeechEnd', VoiceRecognition, e);
	// VoiceRecognition.onsoundend = (e) => console.log('onSoundEnd', VoiceRecognition, e);
	// VoiceRecognition.onaudioend = (e) => console.log('onAudioEnd', VoiceRecognition, e);
	VoiceRecognition.onend = (e) => {
		console.log('onEnd', VoiceRecognition, e);
		if (localStorage.getItem('config') != btoa(JSON.stringify(config))) {
			config = JSON.parse(atob(localStorage.getItem('config')));
			VoiceRecognition.lang = config.sub.lang;
			VoiceRecognition.stop();
		}
		if (init) {
			init = false;
			VoiceRecognition.start();
		}
	};
	VoiceRecognition.onerror = (e) => {
		console.log('onError', VoiceRecognition, e, e.error);
		if (localStorage.getItem('config') != btoa(JSON.stringify(config))) {
			config = JSON.parse(atob(localStorage.getItem('config')));
			VoiceRecognition.lang = config.sub.lang;
		}
		if (e.error == 'not-allowed') {
			window.alert('Please allow microphone access');
		} else {
			init = true;
			VoiceRecognition.stop();
		}
	};
	VoiceRecognition.onnomatch = (e) => {
		console.log('onNoMatch', VoiceRecognition, e);
		if (localStorage.getItem('config') != btoa(JSON.stringify(config))) {
			config = JSON.parse(atob(localStorage.getItem('config')));
			VoiceRecognition.lang = config.sub.lang;
		}
		init = true;
		VoiceRecognition.stop();
	};

	let pauseTimeout;
	/**
     * Stops the voice recognition after a given time with no input
     */
	const pauseStop = function () {
		if (init == true) {
			console.log('Pause Stop', pauseTimeout, config.pause_timer);
			VoiceRecognition.stop();
		}
	};

	let deleteTimeout;
	/**
     * Removes translated text from the screen
     */
	const Delete = function () {
		$('#SubBGText')[0].innerText = '';
		$('#SubFGText')[0].innerText = '';
		config.translations.forEach((translation, index) => {
			$(`#TFg[data-tr="${index}"]`).innerText = '';
			$(`#TBg[data-tr="${index}"]`).innerText = '';
		});
	};

	let spokenText;

	VoiceRecognition.onresult = function (event) {
		clearTimeout(pauseTimeout);
		var results = event.results;
		spokenText = '';

		for (let i = event.resultIndex; i < results.length; i++) {
			spokenText += results[i][0].transcript;
		}

		for (let i = event.resultIndex; i < results.length; i++) {
			if (!results[i].isFinal) {
				if (config.pause_timer != 0) {
					// console.log('pauseTimeout', config.pause_timer);
					pauseTimeout = setTimeout(pauseStop, config.pause_timer);
				}

				// if (config.word_censor == true) {
				//     for (var j = 0; j < sexual_words.length; j++) {
				//         if (spokenText.includes(sexual_words[j])) {
				//             spokenText = spokenText.replace(sexual_words[j], "***");
				//         }
				//     }
				// }

				console.log('[LIVE] ', spokenText, event);

				if (spokenText.length > 0) {
					$('#SubBGText')[0].innerText = '<< ' + spokenText + ' >>';
					$('#SubFGText')[0].innerText = '<< ' + spokenText + ' >>';
				}
				return;
			}

			spokenText = spokenText.trim();

			if (spokenText.length <= 0) return;

			console.log('Final', spokenText);

			// if (config.word_censor == true) {
			//     for (var j = 0; j < sexual_words.length; j++) {
			//         if (spokenText.includes(sexual_words[j])) {
			//             spokenText = spokenText.replace(sexual_words[j], "***");
			//         }
			//     }
			// }

			$('#SubBGText')[0].innerText = spokenText;
			$('#SubFGText')[0].innerText = spokenText;


			if (config.reader_support == true) {
				let bouyomiChanClient = new BouyomiChanClient();
				bouyomiChanClient.talk(spokenText);
			}

			let targetLangs = [];

			config.translations.forEach((translation) => {
				targetLangs.push(translation.lang);
			});

			switch (config.api.type) {
			case 'local':
				translateLocal(config, spokenText, targetLangs);
				break;
			case 'libre':
				translateLibre(config, spokenText, targetLangs);
				break;
			case 'google':
				translateGoogle(config, spokenText, targetLangs);
				break;
			case 'deepl':
				translateDeepl(config, spokenText, targetLangs);
				break;
			default:
				break;
			}
		}

		if (config.delete_timer != 0) {
			clearTimeout(deleteTimeout);
			deleteTimeout = setTimeout(Delete, config.delete_timer);
		}
	};
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

		let query = 'http://193.122.7.216:5000/translate';
		let body = {
			q: text,
			source: config.sub.lang,
			target: targetLangs[i],
			format: 'text',
			api_key: ''
		};

		request.open('POST', query, true);

		request.setRequestHeader('Content-Type', 'Translationlication/json');
		request.send(JSON.stringify(body));

		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				let response = JSON.parse(request.responseText);
				let translation = response.translatedText;
				$('#TFg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
				$('#TBg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
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
				console.log('translateGoogle', `[${targetLangs[i]}]`, response);
				if (config.api.key.length != 0) {
					translation = response.data.translations[0].translatedText;
				} else {
					translation = response[0][0][0];
				}
				$('#TFg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
				$('#TBg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
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
				console.log('translateDeepL', response);
				let translation = response.translations[0].text;
				$('#TFg[data-tr="0"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
				$('#TBg[data-tr="0"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
			}
		};
		request.send(null);
	}
};

/**
 * Selects the audio input device
 * @param {Object} config 
 */
const useAudioDevice = (config) => {
	console.log('Using audio device', config.input_device);
	navigator.mediaDevices.getUserMedia({
		audio: {
			deviceId: {
				exact: config.input_device,
			}
		}
	}).then(stream => {
		window.stream = stream;
	});
};

export default handleAudio;