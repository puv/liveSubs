/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from 'react';
import './assets/css/App.css';
import './assets/css/Fonts.css';
import Config from './assets/js/Config';
import $ from 'jquery';

function App() {

	const [config, setConfig] = useState(Config);

	const onPageLoad = () => {
		if (localStorage.getItem('config')) {
			if (localStorage.getItem('config').localeCompare(btoa(JSON.stringify(config)))) {
				let stringConfig = atob(localStorage.getItem('config'));
				let parsedConfig = JSON.parse(stringConfig);
				setConfig(parsedConfig);
			}
		}
	};

	useEffect(() => {
		if (document.readyState === 'complete') {
			onPageLoad();
			handleAudio();
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	setInterval(() => {
		onPageLoad();
	}, 100);

	const handleAudio = () => {
		console.log('handleAudio');
		navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
			let config = JSON.parse(atob(localStorage.getItem('config')));
			var VoiceRecognition = new webkitSpeechRecognition();
			VoiceRecognition.continuous = true;
			VoiceRecognition.interimResults = true;
			VoiceRecognition.lang = config.sub.lang;
			VoiceRecognition.start();

			let init = false;

			window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

			VoiceRecognition.onstart = (e) => {
				console.log('onStart', VoiceRecognition, e);
				config = JSON.parse(atob(localStorage.getItem('config')));
			};
			VoiceRecognition.onaudiostart = (e) => {
				console.log('onAudioStart', VoiceRecognition, e);
				init = true;
			};
			VoiceRecognition.onsoundstart = (e) => {
				console.log('onSoundStart', VoiceRecognition, e);
				config = JSON.parse(atob(localStorage.getItem('config')));
				if (VoiceRecognition.lang != config.sub.lang) {
					VoiceRecognition.lang = config.sub.lang;
					VoiceRecognition.stop();
				}
			};
			VoiceRecognition.onspeechstart = (e) => console.log('onSoundStart', VoiceRecognition, e);
			VoiceRecognition.onspeechend = (e) => console.log('onSpeechEnd', VoiceRecognition, e);
			VoiceRecognition.onsoundend = (e) => console.log('onSoundEnd', VoiceRecognition, e);
			VoiceRecognition.onaudioend = (e) => console.log('onAudioEnd', VoiceRecognition, e);
			VoiceRecognition.onend = (e) => {
				console.log('onEnd', VoiceRecognition, e);
				if (init) {
					init = false;
					VoiceRecognition.start();
				}
			};
			VoiceRecognition.onerror = (e) => { console.log('onError', VoiceRecognition, e, e.error); VoiceRecognition.stop(); };
			VoiceRecognition.onnomatch = (e) => { console.log('onNoMatch', VoiceRecognition, e); VoiceRecognition.stop(); };

			let pauseTimeout = 0;
			const pauseStop = function () {
				if (init == true) {
					// console.log("Pause Stop")
					VoiceRecognition.stop();
				}
			};

			let deleteTimeout = 0;
			const Delete = function () {
				$('#SubBGText')[0].innerText = '';
				$('#SubFGText')[0].innerText = '';
				config.translations.forEach((translation, index) => {
					$(`#TFg[data-tr="${index}"]`).innerText = '';
					$(`#TBg[data-tr="${index}"]`).innerText = '';
				});
			};

			let spokenText;

			const translateLocal = () => {
			};

			const translateLibre = () => {
			};

			const translateGoogle = (text, targetLangs) => {
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

			const translateDeepl = (text, targetLangs) => {
				if (config.api.key.length <= 0) return;
				let query = 'https://api-free.deepl.com/v2/translate?auth_key=' + config.api.key + '&text=' + encodeURI(text) + '&source_lang=' + config.sub.lang + '&target_lang=' + targetLangs[0];
				let request = new XMLHttpRequest();
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
			};


			VoiceRecognition.onresult = function (event) {
				var results = event.results;
				spokenText = '';

				for (let i = event.resultIndex; i < results.length; i++) {
					spokenText += results[i][0].transcript;
				}

				for (let i = event.resultIndex; i < results.length; i++) {
					if (!results[i].isFinal) {
						if (config.pause_timer != 0) {
							clearTimeout(pauseTimeout);
							console.log('pauseTimeout', pauseTimeout, config.pause_timer);
							pauseTimeout = setTimeout(pauseStop, config.pause_timer);
						}

						// if (config.word_censor == true) {
						//     for (var j = 0; j < sexual_words.length; j++) {
						//         if (spokenText.includes(sexual_words[j])) {
						//             spokenText = spokenText.replace(sexual_words[j], "***");
						//         }
						//     }
						// }

						console.log('[LIVE] ', spokenText);

						if (spokenText.length > 0) {
							$('#SubBGText')[0].innerText = '<< ' + spokenText + ' >>';
							$('#SubFGText')[0].innerText = '<< ' + spokenText + ' >>';
						}
						return;
					}

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
						translateLocal(spokenText, targetLangs);
						break;
					case 'libre':
						translateLibre(spokenText, targetLangs);
						break;
					case 'google':
						translateGoogle(spokenText, targetLangs);
						break;
					case 'deepl':
						translateDeepl(spokenText, targetLangs);
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
		}).catch((err) => {
			console.log('err', err);
			handleAudio();
		});

	};

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
				<div id='Sub'
					style={{
						fontSize: `${config.sub.size}px`,
						fontFamily: config.sub.font,
						fontWeight: config.sub.weight,
						textAlign: config.pos_h,
					}}>
					<div className="text_bg" id="SubBGText"
						style={{
							WebkitTextStroke: `${config.sub.border_width}pt ${config.sub.border_color}`,
						}}>
						Text 1
					</div>
					<div className="text_fg" id="SubFGText"
						style={{
							color: config.sub.color,
						}}>
						Text 1
					</div>
				</div>
				{
					config.translations.map((translation, index) => {
						return (
							<div key={index} id="Translation" data-tr={index} data-lang={translation.lang}
								style={{
									fontSize: `${config.translations[index].size}px`,
									fontFamily: config.translations[index].font,
									fontWeight: config.translations[index].weight,
									textAlign: config.pos_h,
								}}>
								<div className="text_bg" id="TBg" data-tr={index}
									style={{
										WebkitTextStroke: `${config.translations[index].border_width}pt ${config.translations[index].border_color}`,
									}}>
									{'Translation ' + (index + 1)}
								</div>
								<div className="text_fg" id="TFg" data-tr={index}
									style={{
										color: config.translations[index].color,
									}}>
									{'Translation ' + (index + 1)}
								</div>
							</div>
						);
					})
				}
			</div>
		</div>


	);
}

export default App;
