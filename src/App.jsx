/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';

import Overlay from './Overlay';
import TranslationApp from './TranslationApp';
import getConfig from './assets/js/Config';

function App() {

	const [config, setConfig] = useState(getConfig);

	/**
	 * Loads the config from localStorage if it exists, otherwise it creates it
	 */
	const onPageLoad = () => {
		if (!localStorage.getItem('config')) localStorage.setItem('config', btoa(JSON.stringify(config)));
		else updateConfig();

		useAudioDevice();
	};

	/**
	 * Checks if the page is loaded, then calls onPageLoad()
	 */
	useEffect(() => {
		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	/**
	 * Attempts to update the config every 100ms
	 * TODO: Find a better way to do this.
	 */
	setInterval(() => {
		updateConfig();
	}, 100);

	/**
	 * Updates the config if it has changed
	 */
	const updateConfig = () => {
		if (localStorage.getItem('config') != (btoa(JSON.stringify(config)))) {
			let stringConfig = atob(localStorage.getItem('config'));
			let parsedConfig = JSON.parse(stringConfig);
			setConfig(parsedConfig);
		}
	};

	/**
	 * Uses the audio device specified in the config
	 */
	const useAudioDevice = () => {
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

	return (
		<>
			<TranslationApp config={config} />
			<Overlay config={config} />
		</>
	);
}

export default App;
