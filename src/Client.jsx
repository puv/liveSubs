import React, { useState } from 'react';
import ws, { wsSend } from './assets/js/ServerHandler';

import $ from 'jquery';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import { getConfig } from './assets/js/ConfigHandler';
import handleTranslation from './assets/js/TranslationHandler';
import { log } from './assets/js/ConsoleHandler';

function App() {
	const [config, setConfig] = useState(getConfig());

	ws.onopen = () => {
		log('onopen');
		wsSend('client_init');
	};

	ws.onmessage = (e) => {
		try {
			log('onmessage', e.data);
			const msg = JSON.parse(e.data);

			switch (msg.type) {
			case 'config':
				log('onmessage', msg.data);
				setConfig(msg.data);
				break;
			case 'speech':
				log('onmessage', msg.data.text);
				if (msg.data.final == true) {
					$('#SubBGText')[0].innerText = msg.data.text;
					$('#SubFGText')[0].innerText = msg.data.text;

					handleTranslation(config, msg.data.text);
				} else {
					$('#SubBGText')[0].innerText = '<< ' + msg.data.text + ' >>';
					$('#SubFGText')[0].innerText = '<< ' + msg.data.text + ' >>';
				}
				break;
			default:
				break;
			}
		} catch (err) {
			log('onmessage', e.data);
		}
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
