/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';

import Overlay from './Overlay';
import TranslationApp from './TranslationApp';
import getConfig from './assets/js/Config';

function App() {

	const [config, setConfig] = useState(getConfig);

	const onPageLoad = () => {
		if (!localStorage.getItem('config')) return localStorage.setItem('config', btoa(JSON.stringify(config)));

		updateConfig();
	};

	useEffect(() => {
		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	setInterval(() => {
		updateConfig();
	}, 100);

	const updateConfig = () => {
		if (localStorage.getItem('config') != (btoa(JSON.stringify(config)))) {
			let stringConfig = atob(localStorage.getItem('config'));
			let parsedConfig = JSON.parse(stringConfig);
			setConfig(parsedConfig);
		}
	};

	return (
		<>
			<TranslationApp config={config} />
			<Overlay config={config} />
		</>
	);
}

export default App;
