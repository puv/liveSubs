/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from 'react';
import getConfig from './assets/js/Config';
import Overlay from './Overlay';
import TranslationApp from './TranslationApp';

function App() {

	const [config, setConfig] = useState(getConfig);

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
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	setInterval(() => {
		onPageLoad();
	}, 100);

	return (
		<>
			<TranslationApp config={config} />
			<Overlay config={config} />
		</>
	);
}

export default App;
