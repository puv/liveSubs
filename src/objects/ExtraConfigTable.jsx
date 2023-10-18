/* eslint-disable no-undef */

import '../assets/css/App.css';
import '../assets/css/Fonts.css';

import Dictionary from '../assets/js/Dictionary';
import PropTypes from 'prop-types';
import { log } from '../assets/js/handlers/ConsoleHandler';
import { saveConfig } from '../assets/js/handlers/ConfigHandler';

ExtraConfig.propTypes = {
	config: PropTypes.object.isRequired,
};

function ExtraConfig({ config }) {
	/**
	 * Handles input from the settings menu
	 * @param {Element} e 
	 */
	const handleInput = (e) => {
		const newConfig = { ...config };
		const keys = e.target.name.split('.');
		log(e.target.name, e.target.value);
		let currentConfig = newConfig;
		for (let i = 0; i < keys.length - 1; i++) {
			currentConfig = currentConfig[keys[i]];
		}
		currentConfig[keys[keys.length - 1]] = e.target.type == 'checkbox' ? !currentConfig[keys[keys.length - 1]] : e.target.value;
		saveConfig(newConfig);
	};
	
	return (
		<table>
			<thead>
				<tr>
					<th>{Dictionary['type'][config.lang]}</th>
					<th>{Dictionary['positionH'][config.lang]}</th>
					<th>{Dictionary['positionV'][config.lang]}</th>
					<th>{Dictionary['whiteSpace'][config.lang]}</th>
					<th>{Dictionary['deleteSentenceTimer'][config.lang]}</th>
					<th>{Dictionary['newSentenceTimer'][config.lang]}</th>
					<th>{Dictionary['langNames'][config.lang]}</th>
					<th>{Dictionary['bouyomiChan'][config.lang]}</th>
					<th>{Dictionary['wordCensor'][config.lang]}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{Dictionary['text'][config.lang]}</td>
					<td>
						<select id="TextHAlign" onChange={handleInput} name="pos_h" value={config.pos_h}>
							<option value="left">{Dictionary['left'][config.lang]}</option>
							<option value="center">{Dictionary['center'][config.lang]}</option>
							<option value="right">{Dictionary['right'][config.lang]}</option>
						</select>
					</td>
					<td>
						<select id="TextVAlign" onChange={handleInput} name="pos_v" value={config.pos_v}>
							<option value="top">{Dictionary['top'][config.lang]}</option>
							<option value="bottom">{Dictionary['bottom'][config.lang]}</option>
						</select>
					</td>
					<td>
						<select id="WhiteSpace" onChange={handleInput} name="white_space" value={config.white_space}>
							<option value="normal">{Dictionary['normal'][config.lang]}</option>
							<option value="nowrap">{Dictionary['nowrap'][config.lang]}</option>
						</select>
					</td>
					<td>
						<input id="DeleteTimer" type="range" value={config.delete_timer} min="0" max="5000" step="100" name="delete_timer"
							onInput={handleInput}></input>
						<span id="_DeleteTimer">{config.delete_timer}</span>
								ms
					</td>
					<td>
						<input id="PauseTimer" type="range" value={config.pause_timer} min="0" max="1000" step="100" name="pause_timer"
							onInput={handleInput}></input>
						<span id="_PauseTimer">{config.pause_timer}</span>
								ms
					</td>
					<td>
						<input type="checkbox" id="LangNames" onChange={handleInput} checked={config.lang_names} name="lang_names"></input>
					</td>
					<td>
						<input type="checkbox" id="ChatReader" onChange={handleInput} disabled={true} checked={config.reader_support} name="reader_support"></input>
					</td>
					<td>
						<input type="checkbox" id="WordCensor" onChange={handleInput} disabled={true} checked={config.word_censor} name="word_censor"></input>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default ExtraConfig;