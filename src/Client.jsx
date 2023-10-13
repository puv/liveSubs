import React, { useState } from 'react';

import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import { getConfig } from './assets/js/ConfigHandler';
import io from 'socket.io-client';

function App() {
	const [config, setConfig] = useState(getConfig());
	
	const socket = io.connect('http://srv.puv.bar:11117');

	socket.on('connect', () => {
		console.log('Connected!');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected!');
	});

	socket.on('config', (data) => {
		console.log('Config received!');
		setConfig(data);
	});

	socket.on('translation', (data) => {
		console.log('Translation received!', data);
	});

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
					gridTemplateRows: `repeat(${config.translations.length + 1}, auto)`
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

export default App;
