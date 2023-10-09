/* eslint-disable no-undef */

import '../assets/css/App.css';
import '../assets/css/Fonts.css';

import React, { useEffect, useState } from 'react';

import Dictionary from '../assets/js/Dictionary';
import PropTypes from 'prop-types';
import { log } from '../assets/js/Logging';
import { saveConfig } from '../assets/js/Config';

BaseConfig.propTypes = {
	config: PropTypes.object.isRequired,
};

function BaseConfig({ config }) {
	const [inputDevices, setInputDevices] = useState([]);
	const [outputDevices, setOutputDevices] = useState([]);

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
     * Handles the input device selection
     * @param {Element} e 
     */
	const handleDevice = (e) => {
		switch (e.target.id) {
		case 'inputDevice':
			config.input_device = e.target.value;
			navigator.mediaDevices.getUserMedia({
				audio: {
					deviceId: e.target.value ? { exact: e.target.value } : 'default',
				}
			}).then((stream) => {
				window.stream = stream;
			});
			saveConfig(config);
			break;
		case 'outputDevice':
			config.output_device = e.target.value;
			saveConfig(config);
			break;
		default:
			break;
		}
		window.location.reload();
	};

	/**
     * Gets the input and output devices after the page loads
     */
	const onPageLoad = () => {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
			log('Got stream');
			navigator.mediaDevices.enumerateDevices().then((devices) => {
				log('Got devices');

				setInputDevices(devices.filter((device) => device.kind === 'audioinput'));
				setOutputDevices(devices.filter((device) => device.kind === 'audiooutput'));
			});
		});
	};

	/**
     * Checks if the page is loaded, then calls onPageLoad()
     */
	useEffect(() => {
		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad, false);
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>{Dictionary['api_type'][config.lang]}</th>
					<th>{Dictionary['api_key'][config.lang]}</th>
					<th>{Dictionary['input_device'][config.lang]}</th>
					<th>{Dictionary['output_device'][config.lang]}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<select id="apiType" onChange={handleInput} name="api.type" value={config.api.type}>
							<option value="local" disabled={true}>Local</option>
							<option value="libre">Libre Translate</option>
							<option value="google">Google</option>
							<option value="deepl" disabled={true}>DeepL</option>
						</select>
					</td>
					<td>
						<input type="text" name="api_key" id="api_key"
							size="60" onInput={handleInput} disabled={config.api.type == 'local' || config.api.type == 'libre'} />
						<br />
						<span dangerouslySetInnerHTML={{ __html: Dictionary[`api_${config.api.type}_get`][config.lang] }}></span>
					</td>
					<td>
						<select id="inputDevice" onChange={handleDevice} disabled={true} value={config.input_device} name="input_device" style={{
							maxWidth: '15em'
						}}>
							{
								inputDevices.length === 0 ? <option value="">{Dictionary['no_input_device'][config.lang]}</option> :
									inputDevices.map((device) => {
										return (
											<option key={device.deviceId} value={device.deviceId}>{device.label}</option>
										);
									})
							}
						</select>
					</td>
					<td>
						<select id="outputDevice" onChange={handleDevice} disabled={true} value={config.output_device} name="output_device" style={{
							maxWidth: '15em'
						}}>
							{
								(outputDevices.length === 0) ? <option value="">{Dictionary['no_output_device'][config.lang]}</option> :
									outputDevices.map((device) => {
										return (
											<option key={device.deviceId} value={device.deviceId}>{device.label}</option>
										);
									})
							}
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default BaseConfig;