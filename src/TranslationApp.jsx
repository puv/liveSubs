/* eslint-disable no-undef */

import './assets/css/App.css';
import './assets/css/Fonts.css';

import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import Subtitle from './objects/Subtitle';
import Translation from './objects/Translation';
import handleAudio from './assets/js/AudioHandler';

TranslationApp.propTypes = {
	config: PropTypes.object.isRequired,
};

function TranslationApp({ config }) {
	
	/**
	 * Checks if the page is loaded, then calls handleAudio()
	 */
	useEffect(() => {
		if (document.readyState === 'complete') {
			handleAudio(config);
		} else {
			window.addEventListener('load', handleAudio(config), false);
			return () => window.removeEventListener('load', handleAudio(config));
		}
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

export default TranslationApp;
