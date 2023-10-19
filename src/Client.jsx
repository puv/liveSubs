import $ from 'jquery';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import { getConfig } from './assets/js/handlers/ConfigHandler';
import { log } from './assets/js/handlers/ConsoleHandler';
import { useState } from 'react';
import ws from './assets/js/handlers/ServerHandler';

function App() {
	const [config, setConfig] = useState(getConfig());

	ws.onopen = () => {
		log('onopen');
	};

	ws.onmessage = (e) => {
		try {
			const msg = JSON.parse(e.data);

			switch (msg.type) {
			case 'config':
				log('config', JSON.parse(msg.data));
				setConfig(JSON.parse(msg.data));
				break;
			case 'speech':
				if (msg.data.final == true) {
					if (msg.data.text.length > 0) {
						$('#SubBGText')[0].innerText = msg.data.text;
						$('#SubFGText')[0].innerText = msg.data.text;
					}

					msg.data.translations.forEach((translation, index) => {
						$(`#TFg[data-tr="${index}"]`)[0].innerText = `${config.lang_names ? `[${translation.lang.toUpperCase()}] ` : ''}${translation.text}`;
						$(`#TBg[data-tr="${index}"]`)[0].innerText = `${config.lang_names ? `[${translation.lang.toUpperCase()}] ` : ''}${translation.text}`;
					});
				} else {
					$('#SubBGText')[0].innerText = '<< ' + msg.data.text + ' >>';
					$('#SubFGText')[0].innerText = '<< ' + msg.data.text + ' >>';
				}
				break;
			case 'clear':
				$('#SubBGText')[0].innerText = '';
				$('#SubFGText')[0].innerText = '';
					
				config.translations.forEach((translation, index) => {
					$(`#TFg[data-tr="${index}"]`)[0].innerText = '';
					$(`#TBg[data-tr="${index}"]`)[0].innerText = '';
				});
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
