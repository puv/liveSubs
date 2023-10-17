/* eslint-disable no-undef */

import React, { useState } from 'react';

import Overlay from './Overlay';
import TranslationApp from './TranslationApp';
import { getConfig } from './assets/js/handlers/ConfigHandler';

function App() {
	const [config, setConfig] = useState(getConfig());

	window.addEventListener('storage', function (event) {
		if (event.key == 'config') setConfig(JSON.parse(atob(event.newValue)));
	});

	return (
		<>
			<TranslationApp config={config} />
			<Overlay config={config} />
		</>
	);
}

export default App;
