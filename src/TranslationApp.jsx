/* eslint-disable no-undef */

import './assets/css/App.css';
import './assets/css/Fonts.css';

import React, { useEffect, useState } from 'react';

import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import { getConfig } from './assets/js/Config';
import handleAudio from './assets/js/AudioHandler';

function TranslationApp() {
	const [config, setConfig] = useState(getConfig());

	setInterval(() => {
		if (!localStorage.getItem('config')) localStorage.setItem('config', btoa(JSON.stringify(config)));
		else if (btoa(JSON.stringify(config)) != localStorage.getItem('config')) {
			let stringConfig = atob(localStorage.getItem('config'));
			let parsedConfig = JSON.parse(stringConfig);
			setConfig(parsedConfig);
		}
	}, 100);

	/**
	 * Checks if the page is loaded, then calls handleAudio()
	 */
	useEffect(() => {
		if (document.readyState === 'complete') {
			handleAudio(config);
		} else {
			window.addEventListener('load', handleAudio(config), false);
			return () => window.removeEventListener('load', handleAudio(config));
		}
	}, []);

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
						return (
							<Translation key={index} config={config} index={index} />
						);
					})
				}
			</div>
		</div>
	);
}

export default TranslationApp;
