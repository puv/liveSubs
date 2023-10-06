/* eslint-disable no-undef */

import './assets/css/App.css';
import './assets/css/Fonts.css';

import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import handleAudio from './assets/js/AudioHandler';

TranslationApp.propTypes = {
	config: PropTypes.object.isRequired,
};

function TranslationApp({ config }) {
	useEffect(() => {
		if (document.readyState === 'complete') {
			handleAudio(config);
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	// const handleAudio = () => {
	// 	console.log('handleAudio');
	// 	let config;
	// 	try {
	// 		config = JSON.parse(atob(localStorage.getItem('config')));
	// 	} catch (e) {
	// 		localStorage.setItem('config', btoa(JSON.stringify(getConfig)));
	// 		window.location.reload();
	// 	}
	// 	let VoiceRecognition;
	// 	try {
	// 		VoiceRecognition = new webkitSpeechRecognition();
	// 	} catch (e) {
	// 		window.alert(Dictionary['browser_not_supported'][config.lang]);
	// 		window.location.reload();
	// 	}
	// 	// VoiceRecognition.continuous = true;
	// 	VoiceRecognition.interimResults = true;
	// 	VoiceRecognition.lang = config.sub.lang;
	// 	VoiceRecognition.start();

	// 	let init = false;

	// 	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	// 	VoiceRecognition.onstart = () => {
	// 		// console.log('onStart', VoiceRecognition, e);
	// 		config = JSON.parse(atob(localStorage.getItem('config')));
	// 	};
	// 	VoiceRecognition.onaudiostart = (e) => {
	// 		console.log('onAudioStart', VoiceRecognition, e);
	// 		init = true;
	// 		if (localStorage.getItem('config') != btoa(JSON.stringify(config))) {
	// 			config = JSON.parse(atob(localStorage.getItem('config')));
	// 			VoiceRecognition.lang = config.sub.lang;
	// 			VoiceRecognition.stop();
	// 		}
	// 	};
	// 	// VoiceRecognition.onsoundstart = (e) => console.log('onSoundStart', VoiceRecognition, e);
	// 	VoiceRecognition.onspeechstart = (e) => console.log('onSpeechStart', VoiceRecognition, e);
	// 	VoiceRecognition.onspeechend = (e) => console.log('onSpeechEnd', VoiceRecognition, e);
	// 	// VoiceRecognition.onsoundend = (e) => console.log('onSoundEnd', VoiceRecognition, e);
	// 	// VoiceRecognition.onaudioend = (e) => console.log('onAudioEnd', VoiceRecognition, e);
	// 	VoiceRecognition.onend = (e) => {
	// 		console.log('onEnd', VoiceRecognition, e);
	// 		if (init) {
	// 			init = false;
	// 			VoiceRecognition.start();
	// 		}
	// 	};
	// 	VoiceRecognition.onerror = (e) => {
	// 		console.log('onError', VoiceRecognition, e, e.error);
	// 		if (e.error == 'not-allowed') {
	// 			window.alert('Please allow microphone access');
	// 		} else {
	// 			init = true;
	// 			VoiceRecognition.stop();
	// 		}
	// 	};
	// 	VoiceRecognition.onnomatch = (e) => {
	// 		console.log('onNoMatch', VoiceRecognition, e);
	// 		init = true;
	// 		VoiceRecognition.stop();
	// 	};

	// 	let pauseTimeout;
	// 	const pauseStop = function () {
	// 		if (init == true) {
	// 			console.log('Pause Stop', pauseTimeout, config.pause_timer);
	// 			VoiceRecognition.stop();
	// 		}
	// 	};

	// 	let deleteTimeout;
	// 	const Delete = function () {
	// 		$('#SubBGText')[0].innerText = '';
	// 		$('#SubFGText')[0].innerText = '';
	// 		config.translations.forEach((translation, index) => {
	// 			$(`#TFg[data-tr="${index}"]`).innerText = '';
	// 			$(`#TBg[data-tr="${index}"]`).innerText = '';
	// 		});
	// 	};

	// 	let spokenText;

	// 	const translateLocal = () => {
	// 	};

	// 	const translateLibre = (text, targetLangs) => {
	// 		for (let i = 0; i < targetLangs.length; i++) {
	// 			let request = new XMLHttpRequest();

	// 			let query = 'http://193.122.7.216:5000/translate';
	// 			let body = {
	// 				q: text,
	// 				source: config.sub.lang,
	// 				target: targetLangs[i],
	// 				format: 'text',
	// 				api_key: ''
	// 			};

	// 			request.open('POST', query, true);

	// 			request.setRequestHeader('Content-Type', 'Translationlication/json');
	// 			request.send(JSON.stringify(body));

	// 			request.onreadystatechange = function () {
	// 				if (request.readyState === 4 && request.status === 200) {
	// 					let response = JSON.parse(request.responseText);
	// 					let translation = response.translatedText;
	// 					$('#TFg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
	// 					$('#TBg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
	// 				}
	// 			};
	// 		}
	// 	};

	// 	const translateGoogle = (text, targetLangs) => {
	// 		for (let i = 0; i < targetLangs.length; i++) {
	// 			let request = new XMLHttpRequest();
	// 			let query;

	// 			if (config.api.key.length != 0) {
	// 				query = 'https://translation.googleapis.com/language/translate/v2?key=' + config.api.key + '&source=' + config.sub.lang + '&target=' + targetLangs[i] + '&q=' + encodeURI(text);
	// 			} else {
	// 				query = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + config.sub.lang + '&tl=' + targetLangs[i] + '&dt=t&q=' + encodeURI(text);
	// 			}
	// 			request.open('GET', query, true);

	// 			request.onreadystatechange = function () {
	// 				if (request.readyState === 4 && request.status === 200) {
	// 					let response = JSON.parse(request.responseText);
	// 					let translation;
	// 					console.log('translateGoogle', `[${targetLangs[i]}]`, response);
	// 					if (config.api.key.length != 0) {
	// 						translation = response.data.translations[0].translatedText;
	// 					} else {
	// 						translation = response[0][0][0];
	// 					}
	// 					$('#TFg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
	// 					$('#TBg[data-tr="' + i + '"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
	// 				}
	// 			};
	// 			request.send(null);
	// 		}
	// 	};

	// 	const translateDeepl = (text, targetLangs) => {
	// 		if (config.api.key.length <= 0) return;
	// 		let query = 'https://api-free.deepl.com/v2/translate?auth_key=' + config.api.key + '&text=' + encodeURI(text) + '&source_lang=' + config.sub.lang + '&target_lang=' + targetLangs[0];
	// 		let request = new XMLHttpRequest();
	// 		request.open('GET', query, true);
	// 		request.onreadystatechange = function () {
	// 			if (request.readyState === 4 && request.status === 200) {
	// 				let response = JSON.parse(request.responseText);
	// 				console.log('translateDeepL', response);
	// 				let translation = response.translations[0].text;
	// 				$('#TFg[data-tr="0"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
	// 				$('#TBg[data-tr="0"]')[0].innerText = `${config.lang_names ? `[${targetLangs[i].toUpperCase()}] ` : ''}${translation}`;
	// 			}
	// 		};
	// 		request.send(null);
	// 	};


	// 	VoiceRecognition.onresult = function (event) {
	// 		clearTimeout(pauseTimeout);
	// 		var results = event.results;
	// 		spokenText = '';

	// 		for (let i = event.resultIndex; i < results.length; i++) {
	// 			spokenText += results[i][0].transcript;
	// 		}

	// 		for (let i = event.resultIndex; i < results.length; i++) {
	// 			if (!results[i].isFinal) {
	// 				if (config.pause_timer != 0) {
	// 					// console.log('pauseTimeout', config.pause_timer);
	// 					pauseTimeout = setTimeout(pauseStop, config.pause_timer);
	// 				}

	// 				// if (config.word_censor == true) {
	// 				//     for (var j = 0; j < sexual_words.length; j++) {
	// 				//         if (spokenText.includes(sexual_words[j])) {
	// 				//             spokenText = spokenText.replace(sexual_words[j], "***");
	// 				//         }
	// 				//     }
	// 				// }

	// 				console.log('[LIVE] ', spokenText, event);

	// 				if (spokenText.length > 0) {
	// 					$('#SubBGText')[0].innerText = '<< ' + spokenText + ' >>';
	// 					$('#SubFGText')[0].innerText = '<< ' + spokenText + ' >>';
	// 				}
	// 				return;
	// 			}

	// 			spokenText = spokenText.trim();

	// 			if (spokenText.length <= 0) return;

	// 			console.log('Final', spokenText);

	// 			// if (config.word_censor == true) {
	// 			//     for (var j = 0; j < sexual_words.length; j++) {
	// 			//         if (spokenText.includes(sexual_words[j])) {
	// 			//             spokenText = spokenText.replace(sexual_words[j], "***");
	// 			//         }
	// 			//     }
	// 			// }

	// 			$('#SubBGText')[0].innerText = spokenText;
	// 			$('#SubFGText')[0].innerText = spokenText;


	// 			if (config.reader_support == true) {
	// 				let bouyomiChanClient = new BouyomiChanClient();
	// 				bouyomiChanClient.talk(spokenText);
	// 			}

	// 			let targetLangs = [];

	// 			config.translations.forEach((translation) => {
	// 				targetLangs.push(translation.lang);
	// 			});

	// 			switch (config.api.type) {
	// 			case 'local':
	// 				translateLocal(spokenText, targetLangs);
	// 				break;
	// 			case 'libre':
	// 				translateLibre(spokenText, targetLangs);
	// 				break;
	// 			case 'google':
	// 				translateGoogle(spokenText, targetLangs);
	// 				break;
	// 			case 'deepl':
	// 				translateDeepl(spokenText, targetLangs);
	// 				break;
	// 			default:
	// 				break;
	// 			}
	// 		}

	// 		if (config.delete_timer != 0) {
	// 			clearTimeout(deleteTimeout);
	// 			deleteTimeout = setTimeout(Delete, config.delete_timer);
	// 		}
	// 	};

	// };

	return (
		<div id="App"
			style={{
				backgroundColor: config.bg_color,
			}}>
			<div id="wrapper"
				style={{
					top: config.pos_v == 'top' ? '0' : 'unset',
					bottom: config.pos_v == 'bottom' ? '0' : 'unset',
					whiteSpace: config.white_space,
				}}>
				<Subtitle config={config} />
				{
					config.translations.map((translation, index) => {
						<Translation key={index} translation={translation} index={index} />;
					})
				}
			</div>
		</div>
	);
}

export default TranslationApp;
