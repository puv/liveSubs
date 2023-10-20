/* eslint-disable react/no-unknown-property */

import './assets/css/Overlay.css';

import { getNewConfig, saveConfig } from './assets/js/handlers/ConfigHandler';

import $ from 'jquery';
import BaseConfigTable from './objects/BaseConfigTable';
import Dictionary from './assets/js/Dictionary';
import ExtraConfigTable from './objects/ExtraConfigTable';
import Languages from './assets/js/Languages';
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
				{ 
					Dictionary['bottomText'] ? <span dangerouslySetInnerHTML={{ __html: Dictionary['bottomText'][config.lang] }}></span> : <></>
				}
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
			['lang']: e.target.value,
		};
		saveConfig(newConfig);
	};

	return (
		<div className="footer">
			<div style={{
				display: 'flex',
				gap: '.25em',
				textAlign: 'center',
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

				<div className='button updateButton btn_neutral' onClick={() => {
					window.location.reload();
				}}>
					<a>{Dictionary['update'][config.lang]}</a>
				</div>
			</div>

			<div className="credits">
				<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][0][config.lang] }}></span>
				<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][1][config.lang] }}></span>
				<div className='button downloadButton btn_info' style={{
					display: window.__TAURI__ ? 'none' : 'block',
				}}>
					<span dangerouslySetInnerHTML={{ __html: Dictionary['download'][config.lang] }}></span>
				</div>
			</div>
			<div className="language">
				<span dangerouslySetInnerHTML={{ __html: Dictionary['ui_lang'][config.lang] }}></span>
				<select onChange={setLanguage} value={config.lang}>
					{
						Languages.filter(l => ['en', 'ja', 'ko', 'zh-CN'].includes(l.code)).map((lang) => {
							return (
								<option key={lang.code} value={lang.code}>{lang.name.native} ({lang['name'][config.lang]})</option>
							);
						})
					}
				</select>
			</div>
		</div>
	);
}

export default Overlay;