/* eslint-disable no-undef */

import Overlay from './Overlay.jsx';
import TranslationApp from './TranslationApp.jsx';
import { getConfig } from './assets/js/handlers/ConfigHandler.js';
import { useState } from 'react';

function App() {
	const [config, setConfig] = useState(getConfig());

	window.addEventListener('storage', function (event) {
		if (event.key == 'config' && event.newValue !== null) {
			setConfig(JSON.parse(atob(event.newValue)));
		}
	});

	return (
		<>
			<TranslationApp config={config} />
			<Overlay config={config} />
		</>
	);
}

export default App;
