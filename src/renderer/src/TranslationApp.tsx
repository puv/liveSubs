/* eslint-disable no-undef */

import './assets/css/App.css';
import './assets/css/Fonts.css';

import PropTypes from 'prop-types';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import handleAudio from './assets/js/handlers/AudioHandler';
import { useEffect } from 'react';

TranslationApp.propTypes = {
	config: PropTypes.object.isRequired,
};

function TranslationApp({ config }): JSX.Element {
	useEffect(() => {
		if (document.readyState === 'complete') {
			handleAudio();
		} else {
			window.addEventListener('load', handleAudio, false);
			return () => window.removeEventListener('load', handleAudio);
		}
		return;
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

export default TranslationApp;
