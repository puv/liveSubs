/* eslint-disable no-undef */

import '../assets/css/App.css';
import '../assets/css/Fonts.css';

import Dictionary from '../assets/js/Dictionary';
import Fonts from '../assets/js/Fonts';
import Languages from '../assets/js/Languages';
import PropTypes from 'prop-types';
import React from 'react';
import { log } from '../assets/js/Logging';
import { saveConfig } from '../assets/js/Config';

MainConfig.propTypes = {
	config: PropTypes.object.isRequired,
};

function MainConfig({ config }) {
	/**
	 * Handles input from the settings menu
	 * @param {Element} e 
	 */
	const handleInput = (e) => {
		let newConfig = { ...config };
		const keys = e.target.name.split('.');
		log(e.target.name, e.target.value);
		let currentConfig = newConfig;
		for (let i = 0; i < keys.length - 1; i++) {
			currentConfig = currentConfig[keys[i]];
		}
		currentConfig[keys[keys.length - 1]] = e.target.type == 'checkbox' ? !currentConfig[keys[keys.length - 1]] : e.target.value;
		saveConfig(newConfig);
	};

	/**
	 * Adds a translation to the config
	 */
	const addTranslation = () => {
		let newConfig = {
			...config,
			['translations']: [
				...config['translations'],
				{
					'text': '',
					'color': '#ffffff',
					'border_color': '#000000',
					'size': 36,
					'weight': 900,
					'border_width': 5,
					'lang': 'en',
					'font': 'YasashisaB',
				}
			]
		};
		saveConfig(newConfig);
	};

	/**
	 * Deletes a translation from the config
	 * @param {Element} e 
	 */
	const deleteTranslation = (e) => {
		let newConfig = {
			...config,
			['translations']: config['translations'].filter((_, i) => i !== parseInt(e.target.getAttribute('name').split('.')[1])),
		};
		saveConfig(newConfig);
	};

	return (
		<table id="translationTable">
			<thead>
				<tr>
					<th>{Dictionary['type'][config.lang]}</th>
					<th>{Dictionary['color'][config.lang]}</th>
					<th>{Dictionary['border'][config.lang]}</th>
					<th>{Dictionary['size'][config.lang]}</th>
					<th>{Dictionary['weight'][config.lang]}</th>
					<th>{Dictionary['borderWeight'][config.lang]}</th>
					<th>{Dictionary['lang'][config.lang]}</th>
					<th>{Dictionary['font'][config.lang]}</th>
					<th>{Dictionary['delete'][config.lang]}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{Dictionary['background'][config.lang]}</td>
					<td>
						<input id="bgColor" type="color" value={config.bg_color} name="bg_color" onInput={handleInput} />
					</td>
				</tr>
				<tr>
					<td>{Dictionary['subtitle'][config.lang]}</td>
					<td><input id="SubColor" type="color" value={config.sub.color} name="sub.color" onInput={handleInput} /></td>
					<td><input id="SubBorderColor" type="color" value={config.sub.border_color} name="sub.border_color" onInput={handleInput} /></td>
					<td><input id="SubSize" type="range" value={config.sub.size} min="0" max="72" step="1" name="sub.size"
						onInput={handleInput} />
					<span id="_SubSize">{config.sub.size}</span>pt</td>
					<td>
						<input id="SubWeight" type="range" value={config.sub.weight} min="100" max="900" step="100" name="sub.weight"
							onInput={handleInput} />
						<span id="_SubWeight">{config.sub.weight}</span>
					</td>
					<td>
						<input id="SubBorderWidth" type="range" value={config.sub.border_width} min="0" max="20" step="1" name="sub.border_width"
							onInput={handleInput} />
						<span id="_SubBorderWidth">{config.sub.border_width}</span>pt
					</td>
					<td>
						<select id="SubLang" onChange={handleInput} name="sub.lang" value={config.sub.lang}>
							{
								Languages.map((lang) => {
									return (
										<option key={lang.code} value={lang.code}>{lang.name.native} ({lang['name'][config.lang]})</option>
									);
								})
							}
						</select>
					</td>
					<td>
						<select id="SubFont" onChange={handleInput} name="sub.font" value={config.sub.font}>
							{
								Fonts.map((font) => {
									return (
										<option key={font.code} value={font.code}>{font.name}</option>
									);
								})
							}
						</select>
					</td>
				</tr>
			</tbody>
			<tbody>
				{
					config['translations'].map((_, i) => TranslationOption(i, config, handleInput, deleteTranslation))
				}
			</tbody>
			<tbody>
				{
					config['translations'].length < 5 ?
						<tr>
							<td colSpan="9" id="addTranslation" onClick={addTranslation}>
								{Dictionary['add_translation'][config.lang]}
							</td>
						</tr> : <></>
				}
			</tbody>
		</table>
	);
}

function TranslationOption(number, config, handleInput, deleteTranslation) {
	return (
		<tr key={number}>
			<td>{Dictionary['translation'][config.lang]} {number + 1}</td>
			<td><input type="color" value={config.translations[number].color} name={`translations.${number}.color`} onInput={handleInput} /></td>
			<td><input type="color" value={config.translations[number].border_color} name={`translations.${number}.border_color`} onInput={handleInput} /></td>
			<td><input type="range" value={config.translations[number].size} min="0" max="72" step="1" name={`translations.${number}.size`}
				onInput={handleInput} />
			<span>{config.translations[number].size}</span>pt</td>
			<td>
				<input type="range" value={config.translations[number].weight} min="100" max="900" step="100" name={`translations.${number}.weight`}
					onInput={handleInput} />
				<span>{config.translations[number].weight}</span>
			</td>
			<td>
				<input type="range" value={config.translations[number].border_width} min="0" max="20" step="1" name={`translations.${number}.border_width`}
					onInput={handleInput} />
				<span>{config.translations[number].border_width}</span>pt
			</td>
			<td>
				<select onChange={handleInput} name={`translations.${number}.lang`} value={config.translations[number].lang}>
					{
						Languages.map((lang) => {
							return (
								<option key={lang.code} value={lang.code}>{lang.name.native} ({lang['name'][config.lang]})</option>
							);
						})
					}
				</select>
			</td>
			<td>
				<select id="SubFont" onChange={handleInput} name={`translations.${number}.font`} value={config.translations[number].font}>
					{
						Fonts.map((font) => {
							return (
								<option key={font.code} value={font.code}>{font.name}</option>
							);
						})
					}
				</select>
			</td>
			<td>
				<button onClick={deleteTranslation} name={`translations.${number}`}>X</button>
			</td>
		</tr>
	);
}

export default MainConfig;