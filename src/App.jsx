/* eslint-disable no-undef */

import { Config, getConfig } from './assets/js/Config';
import React, { useEffect, useState } from 'react';

import Overlay from './Overlay';
import TranslationApp from './TranslationApp';

function App() {
	const [config, setConfig] = useState(getConfig() || Config);

	/**
	 * Checks if the page is loaded, then calls updateConfig() and useAudioDevice()
	 */
	useEffect(() => {
		if (document.readyState === 'complete') {
			updateConfig();
		} else {
			window.addEventListener('load', updateConfig, false);
			return () => window.removeEventListener('load', updateConfig);
		}
	}, []);

	/**
	 * Attempts to update the config every 100ms
	 * TODO: Find a better way to do this.
	 */
	setInterval(() => {
		updateConfig();
	}, 1000);

	/**
	 * Updates the config if it has changed
	 */
	const updateConfig = () => {
		if (!localStorage.getItem('config')) localStorage.setItem('config', btoa(JSON.stringify(config)));
		else if (btoa(JSON.stringify(config)) != localStorage.getItem('config')) {
			let stringConfig = atob(localStorage.getItem('config'));
			let parsedConfig = JSON.parse(stringConfig);
			setConfig(parsedConfig);
		}
	};

	return (
		<>
			<TranslationApp />
			<Overlay />
		</>
	);
}

export default App;
