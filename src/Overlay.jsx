import React from 'react';
import { useState } from 'react';
import './assets/css/Overlay.css';
import Dictionary from './assets/js/Dictionary.js';
import Config from './assets/js/Config';
import { useEffect } from 'react';
import $ from 'jquery';
import Languages from './assets/js/Languages';
import Fonts from './assets/js/Fonts';


function Overlay() {
	const [config, setConfig] = useState(Config);

	const handleInput = (e) => {
		let newConfig = { ...config };
		const keys = e.target.name.split('.');
		let currentConfig = newConfig;
		for (let i = 0; i < keys.length - 1; i++) {
			currentConfig = currentConfig[keys[i]];
		}
		currentConfig[keys[keys.length - 1]] = e.target.value;
		setConfig(newConfig);
		saveConfig(newConfig);
	};

	const saveConfig = (config) => {
		let stringConfig = JSON.stringify(config);
		let encodedConfig = btoa(stringConfig);
		localStorage.setItem('config', encodedConfig);
	};

	const closeOverlay = () => {
		$('#overlay').css('display', 'none');
	};

	const setLanguage = (e) => {
		let newConfig = {
			...config,
			['lang']: e.target.getAttribute('name'),
		};
		setConfig(newConfig);
		saveConfig(newConfig);
	};

	const setLanguageByText = (lang) => {
		let newConfig = {
			...config,
			['lang']: lang,
		};
		setConfig(newConfig);
		saveConfig(newConfig);
	};

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
		setConfig(newConfig);
		saveConfig(newConfig);
	};

	const deleteTranslation = (e) => {
		let newConfig = {
			...config,
			['translations']: config['translations'].filter((_, i) => i !== parseInt(e.target.getAttribute('name').split('.')[1])),
		};
		setConfig(newConfig);
		saveConfig(newConfig);
	};

	const onPageLoad = () => {
		let parsedConfig = null;
		if (localStorage.getItem('config')) {
			let stringConfig = atob(localStorage.getItem('config'));
			parsedConfig = JSON.parse(stringConfig);
			setConfig(parsedConfig);
		} else {
			let encodedConfig = btoa(JSON.stringify(Config));
			localStorage.setItem('config', encodedConfig);
			setConfig(Config);
			let userLang = navigator.language || navigator.userLanguage;
			if (userLang.includes('ja')) setLanguageByText('jp');
			else if (userLang.includes('ko')) setLanguageByText('kr');
			else if (userLang.includes('zh')) setLanguageByText('cn');
			else setLanguageByText('en');
		}
	};

	useEffect(() => {
		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	const resetSettings = () => {
		let newConfig = Config;
		setConfig(newConfig);
		saveConfig(newConfig);
	};

	return (
		<div id="overlay">
			<div id="settings">
				<table>
					<thead>
						<tr>
							<th>{Dictionary['api_type'][config.lang]}</th>
							<th>{Dictionary['api_key'][config.lang]}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<select id="apiType" onChange={handleInput} name="api.type" value={config.api.type}>
									<option value="local" disabled={true}>Local</option>
									<option value="libre" disabled={true}>Libre Translate</option>
									<option value="google">Google</option>
									<option value="deepl" disabled={true}>DeepL</option>
								</select>
							</td>
							<td>
								<input type="text" name="api_key" id="api_key"
									size="60" onInput={handleInput} disabled={config.api.type == 'local' || config.api.type == 'libreTranslate'} />
								<br />
								<span dangerouslySetInnerHTML={{ __html: Dictionary[`api_${config.api.type}_get`][config.lang] }}></span>
							</td>
						</tr>
					</tbody>
				</table>
				{/* <span dangerouslySetInnerHTML={{ __html: Dictionary['api_explained'][config.lang] }}></span> */}
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
							<span id="_SubSize">{config.sub.size}</span>px</td>
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
												<option key={lang.code} value={lang.code}>{lang.name}</option>
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
							<th>{Dictionary['bouyoumiChan'][config.lang]}</th>
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
								<input type="checkbox" id="ChatReader" onChange={handleInput} checked={config.reader_support} name="reader_support"></input>
							</td>
							<td>
								<input type="checkbox" id="WordCensor" onChange={handleInput} disabled={true} checked={config.word_censor} name="word_censor"></input>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="footer">
					<div style={{
						display: 'flex',
						gap: '1em',
					}}>
						<div className="button closeButton" onClick={closeOverlay}>
							<a>{Dictionary['close'][config.lang]}</a>
						</div>

						<div className="button resetButton" onClick={resetSettings}>
							<a>{Dictionary['reset'][config.lang]}</a>
						</div>
					</div>

					<div className="credits">
						<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][0][config.lang] }}></span>
						<span dangerouslySetInnerHTML={{ __html: Dictionary['credits'][1][config.lang] }}></span>
					</div>
					<div className="language">
						<div className="button langButton" name='en' onClick={setLanguage}>
							English
						</div>
						<div className="button langButton" name='jp' onClick={setLanguage}>
							日本語
						</div>
						<div className="button langButton" name='kr' onClick={setLanguage}>
							한국인
						</div>
						<div className="button langButton" name='cn' onClick={setLanguage}>
							中國人
						</div>
					</div>
				</div>
				<span dangerouslySetInnerHTML={{ __html: Dictionary['bottomText'][config.lang] }}></span>
			</div>
		</div>
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
			<span>{config.translations[number].size}</span>px</td>
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
								<option key={lang.code} value={lang.code}>{lang.name}</option>
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

export default Overlay;