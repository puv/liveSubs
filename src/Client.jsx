import React, { useState } from 'react';

import $ from 'jquery';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import { getConfig } from './assets/js/ConfigHandler';
import { log } from './assets/js/ConsoleHandler';
import ws from './assets/js/ServerHandler';

function App() {
	const [config, setConfig] = useState(getConfig());

	ws.onmessage = (e) => {
		try {
			const msg = JSON.parse(e.data);
			log('onmessage', msg);

			switch (msg.type) {
			case 'config':
				setConfig(msg.data);
				break;
			case 'text':
				if (msg.data.final == true) {
					$('#SubBGText')[0].innerText = msg.data.text;
					$('#SubFGText')[0].innerText = msg.data.text;
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
