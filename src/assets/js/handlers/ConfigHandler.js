let Config = {
	'api': {
		'type': 'google', // local, libre, google, deepl
		'key': '',
	},
	'lang': getLang(), // en, ja, ko, zh
	'sub': {
		'color': '#ffffff',
		'border_color': '#000000',
		'size': 16,
		'weight': 900,
		'border_width': 5,
		'lang': getLang(),
		'font': 'YasashisaB',
	},
	'translations': [],
	'bg_color': '#00ff00',
	'reader_support': false, // true, false
	'word_censor': false, // true, false
	'lang_names': false, // true, false
	'pause_timer': 1000,
	'delete_timer': 0,
	'pos_h': 'center', // left, center, right
	'pos_v': 'top', // top, bottom
	'white_space': 'normal', // normal, nowrap
	'input_device': 'default',
	'output_device': 'default',
	'server': window.__TAURI__ ? true : false,
};

let configTimeout;

/**
 * Get renewed config object
 * @returns Config object
 */
function getConfig() {
	try {
		const config = localStorage.getItem('config');
		if (!config) {
			localStorage.setItem('config', btoa(JSON.stringify(Config)));
			return Config;
		}
		const bytesConfig = atob(config);
		const configObj = updateConfigValues(JSON.parse(bytesConfig || JSON.stringify(Config)));
		return configObj;
	} catch (e) {
		return Config;
	}
}

/**
 * Saves the config to localStorage
 * @param {Object} config 
 */
const saveConfig = (config) => {
	clearTimeout(configTimeout);
	configTimeout = setTimeout(() => {
		let stringConfig = JSON.stringify(config);
		let encodedConfig = btoa(stringConfig);
		localStorage.setItem('config', encodedConfig);
	}, 1);
};

/**
 * Update config object with missing keys
 * @param {Object} configObj Config object
 * @returns New config object
 */
function updateConfigValues(configObj) {
	if (configObj === null) return null;

	const keys = Object.keys(getConfig);
	for (const key of keys) {
		if (configObj[key] === undefined) {
			configObj[key] = Config[key];
		}
	}

	return configObj;
}	

/**
 * Retrieve supported language code browser
 * @returns Language code
 */
function getLang() {
	let lang = navigator.language || navigator.userLanguage || 'en';
	lang = lang.toLowerCase();
	if (lang.includes('ja')) return 'ja';
	else if (lang.includes('ko')) return 'ko';
	else if (lang.includes('zh')) return 'zh';
	else return 'en';
}

/**
 * Returns default config object
 * @returns New config object
 */
function getNewConfig() {
	return Config;
}

/**
	 * Adds a translation to the config
	 */
const addTranslation = () => {
	let config = getConfig();
	let newConfig = {
		...config,
		['translations']: [
			...config['translations'],
			{
				'text': '',
				'color': '#ffffff',
				'border_color': '#000000',
				'size': 32,
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
	let config = getConfig();
	let newConfig = {
		...config,
		['translations']: config['translations'].filter((_, i) => i !== parseInt(e.target.getAttribute('name').split('.')[1])),
	};
	saveConfig(newConfig);
};

export { getNewConfig, addTranslation, deleteTranslation, Config, getConfig, saveConfig, updateConfigValues };