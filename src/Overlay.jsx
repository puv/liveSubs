/* eslint-disable react/no-unknown-property */

import './assets/css/Overlay.css';

import { getNewConfig, saveConfig } from './assets/js/handlers/ConfigHandler';

import $ from 'jquery';
import BaseConfigTable from './objects/BaseConfigTable';
import Dictionary from './assets/js/Dictionary';
import ExtraConfigTable from './objects/ExtraConfigTable';
import MainConfigTable from './objects/MainConfigTable';
import PropTypes from 'prop-types';

Overlay.propTypes = {
	config: PropTypes.object.isRequired,
};

function Overlay({ config }) {
	return (
		<div id="overlay">
			<div id="settings">
				<BaseConfigTable config={config} />
				<MainConfigTable config={config} />
				<ExtraConfigTable config={config} />
				<OverlayFooter config={config} />
				<span dangerouslySetInnerHTML={{ __html: Dictionary['bottomText'][config.lang] }}></span>
			</div>
		</div>
	);
}

OverlayFooter.propTypes = {
	config: PropTypes.object.isRequired,
};

function OverlayFooter({ config }) {
	/**
	 * Sets the language of the overlay
	 * @param {Element} e 
	 */
	const setLanguage = (e) => {
		const newConfig = {
			...config,
			['lang']: e.target.getAttribute('data-name'),
		};
		saveConfig(newConfig);
	};

	return (
		<div className="footer">
			<div style={{
				display: 'flex',
				gap: '1em',
			}}>
				<div className="button closeButton btn_success" onClick={() => {
					$('#overlay').css('display', 'none');
				}}>
					<a>{Dictionary['close'][config.lang]}</a>
				</div>

				<div className="button resetButton btn_error" onClick={() => {
					saveConfig(getNewConfig());
				}}>
					<a>{Dictionary['reset'][config.lang]}</a>
				</div>
			</div>

			<div className="credits">
				<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][0][config.lang] }}></span>
				<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][1][config.lang] }}></span>
				<div className='button downloadButton btn_info'>
					<span dangerouslySetInnerHTML={{ __html: Dictionary['download'][config.lang] }}></span>
				</div>
			</div>
			<div className="language">
				<div className="button langButton btn_neutral" data-name='en' onClick={setLanguage}>
							English
				</div>
				<div className="button langButton btn_neutral" data-name='ja' onClick={setLanguage}>
							日本語
				</div>
				<div className="button langButton btn_neutral" data-name='ko' onClick={setLanguage}>
							한국인
				</div>
				<div className="button langButton btn_neutral" data-name='zh' onClick={setLanguage}>
							中國人
				</div>
			</div>
		</div>
	);
}

export default Overlay;