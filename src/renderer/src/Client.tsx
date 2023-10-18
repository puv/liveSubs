import ws, { wsSendToServer } from './assets/js/handlers/ServerHandler';

import $ from 'jquery';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import { getConfig } from './assets/js/handlers/ConfigHandler';
import handleTranslation from './assets/js/handlers/TranslationHandler';
import { log } from './assets/js/handlers/ConsoleHandler';
import { useState } from 'react';

function App(): JSX.Element {
	const [config, setConfig] = useState(getConfig());

	ws.onopen = (): void => {
		log('onopen');
		wsSendToServer('client_init');
	};

	ws.onmessage = (e): void => {
		try {
			const msg = JSON.parse(e.data);

			switch (msg.type) {
			case 'config':
				log('config', JSON.parse(msg.data));
				setConfig(JSON.parse(msg.data));
				break;
			case 'speech':
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
					config.translations.map((_translation, index) => {
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
