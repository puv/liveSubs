/* eslint-disable react/no-unknown-property */

import './assets/css/Overlay.css';

import { getNewConfig, saveConfig } from './assets/js/Config';

import $ from 'jquery';
import BaseConfigTable from './objects/BaseConfigTable';
import Dictionary from './assets/js/Dictionary';
import ExtraConfigTable from './objects/ExtraConfigTable';
import MainConfigTable from './objects/MainConfigTable';
import PropTypes from 'prop-types';
import React from 'react';

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
		let newConfig = {
			...config,
			['lang']: e.target.getAttribute('name'),
		};
		saveConfig(newConfig);
	};

	return (
		<div className="footer">
			<div style={{
				display: 'flex',
				gap: '1em',
			}}>
				<div className="button closeButton" onClick={() => {
					$('#overlay').css('display', 'none');
				}}>
					<a>{Dictionary['close'][config.lang]}</a>
				</div>

				<div className="button resetButton" onClick={() => {
					saveConfig(getNewConfig());
				}}>
					<a>{Dictionary['reset'][config.lang]}</a>
				</div>
			</div>

			<div className="credits">
				<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][0][config.lang] }}></span>
				<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][1][config.lang] }}></span>
				<div className='button downloadButton'>
					<span dangerouslySetInnerHTML={{ __html: Dictionary['download'][config.lang] }}></span>
				</div>
			</div>
			<div className="language">
				<div className="button langButton" name='en' onClick={setLanguage}>
							English
				</div>
				<div className="button langButton" name='ja' onClick={setLanguage}>
							日本語
				</div>
				<div className="button langButton" name='ko' onClick={setLanguage}>
							한국인
				</div>
				<div className="button langButton" name='zh' onClick={setLanguage}>
							中國人
				</div>
			</div>
		</div>
	);
}

export default Overlay;