import ws, { wsSend } from './ServerHandler';

import $ from 'jquery';
import BouyomiChanClient from './BouyomiChanClient';
import Dictionary from './Dictionary';
import handleTranslation from './TranslationHandler';
import { log } from './ConsoleHandler';

let VoiceRecognition;
let init = false;
let pauseTimeout;
let deleteTimeout;
let spokenText = '';
let config;

try {
	config = JSON.parse(atob(localStorage.getItem('config')));
} catch (e) {
	localStorage.setItem('config', btoa(JSON.stringify(config)));
	window.location.reload();
}

window.addEventListener('storage', function (event) {
	if (event.key == 'config') {
		config = JSON.parse(atob(event.newValue));
		VoiceRecognition.lang = config.sub.lang;
		if (ws.OPEN && config.server != 'off') wsSend('config', JSON.stringify(config));
	}
});

if (config.server != 'off') {
	ws.onopen = () => {
		wsSend('config', JSON.stringify(config));
	};
}

const handleAudio = () => {
	log('handleAudio');

	try {
		// eslint-disable-next-line no-undef
		VoiceRecognition = new webkitSpeechRecognition();
	} catch (e) {
		window.alert(Dictionary['browser_not_supported'][config.lang]);
		window.location.reload();
	}

	// VoiceRecognition.continuous = true;
	VoiceRecognition.interimResults = true;
	VoiceRecognition.lang = config.sub.lang;
	useAudioDevice(config);
	VoiceRecognition.start();

	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	// VoiceRecognition.onstart = () => log('onStart', VoiceRecognition);
	VoiceRecognition.onaudiostart = (e) => {
		log('onAudioStart', [VoiceRecognition, e]);
		init = true;
	};
	// VoiceRecognition.onsoundstart = (e) => log('onSoundStart', VoiceRecognition, e);
	// VoiceRecognition.onspeechstart = (e) => log('onSpeechStart', VoiceRecognition, e);
	// VoiceRecognition.onspeechend = (e) => log('onSpeechEnd', VoiceRecognition, e);
	// VoiceRecognition.onsoundend = (e) => log('onSoundEnd', VoiceRecognition, e);
	// VoiceRecognition.onaudioend = (e) => log('onAudioEnd', VoiceRecognition, e);
	VoiceRecognition.onend = (e) => {
		log('onEnd', spokenText.length, [VoiceRecognition, e]);
		if (init) {
			init = false;
			VoiceRecognition.start();
		}
		if (spokenText.length > 0) {
			if (config.server == false) handleTranslation(config, spokenText);
			spokenText = '';
		}
	};
	VoiceRecognition.onerror = (e) => {
		log('onError', [VoiceRecognition, e], e.error);
		if (e.error == 'not-allowed') {
			window.alert('Please allow microphone access');
			navigator.mediaDevices.getUserMedia({ audio: true });
		} else {
			init = true;
			VoiceRecognition.stop();
		}
	};
	VoiceRecognition.onnomatch = (e) => {
		log('onNoMatch', [VoiceRecognition, e]);
		init = true;
		VoiceRecognition.stop();
	};

	/**
	 * Stops the voice recognition after a given time with no input
	 */
	const pauseStop = function () {
		if (init == true) {
			log('Pause Stop', pauseTimeout, config.pause_timer);
			VoiceRecognition.stop();
			// if(config.server == false) handleTranslation(config, text);
			// spokenText = '';
		}
	};

	/**
	 * Removes translated text from the screen
	 */
	const Delete = function () {
		$('#SubBGText')[0].innerText = '';
		$('#SubFGText')[0].innerText = '';
		config.translations.forEach((translation, index) => {
			$(`#TFg[data-tr="${index}"]`)[0].innerText = '';
			$(`#TBg[data-tr="${index}"]`)[0].innerText = '';
		});
	};

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
					// log('pauseTimeout', config.pause_timer);
					pauseTimeout = setTimeout(pauseStop, config.pause_timer, spokenText);
				}

				// if (config.word_censor == true) {
				//     for (var j = 0; j < sexual_words.length; j++) {
				//         if (spokenText.includes(sexual_words[j])) {
				//             spokenText = spokenText.replace(sexual_words[j], "***");
				//         }
				//     }
				// }

				log('[LIVE] ', spokenText);

				if (spokenText.length > 0) {
					$('#SubBGText')[0].innerText = '<< ' + spokenText + ' >>';
					$('#SubFGText')[0].innerText = '<< ' + spokenText + ' >>';
				}

				if (config.server != 'off') {
					wsSend('speech', {
						text: spokenText,
						final: false,
						lang: config.sub.lang
					});
					return;
				}

				return;
			}

			spokenText = spokenText.trim();

			if (spokenText.length <= 0) return;

			init = true;
			VoiceRecognition.stop();

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

			if (config.server != 'off') {
				wsSend('speech', {
					text: spokenText,
					final: true,
					lang: config.sub.lang
				});
				return;
			}

			handleTranslation(config, spokenText);
			spokenText = '';
		}

		if (config.delete_timer != 0) {
			clearTimeout(deleteTimeout);
			deleteTimeout = setTimeout(Delete, config.delete_timer);
		}
	};
};


/**
 * Selects the audio input device
 * @param {Object} config 
 */
const useAudioDevice = (config) => {
	log('Using audio device', config.input_device);
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