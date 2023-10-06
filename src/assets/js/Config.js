let Config = {
	'api': {
		'type': 'google',
		'key': '',
	},
	'lang': getLang(),
	'sub': {
		'color': '#ffffff',
		'border_color': '#000000',
		'size': 36,
		'weight': 900,
		'border_width': 5,
		'lang': getLang(),
		'font': 'YasashisaB',
	},
	'translations': [],
	'bg_color': '#00ff00',
	'reader_support': false,
	'word_censor': false,
	'lang_names': false,
	'pause_timer': 1000,
	'delete_timer': 0,
	'pos_h': 'left',
	'pos_v': 'bottom',
	'white_space': 'normal',
};

function getConfig() {
	const config = localStorage.getItem('config');
	if (config === null) return Config;

	const bytesConfig = atob(config);
	const configObj = updateConfig(JSON.parse(bytesConfig)) || Config;
	return configObj;
}

function updateConfig(configObj) {
	if (configObj === null) return null;

	const keys = Object.keys(getConfig);
	for (const key of keys) {
		if (configObj[key] === undefined) {
			configObj[key] = Config[key];
		}
	}

	return configObj;
}

function getLang() {
	let lang = navigator.language || navigator.userLanguage || 'en';
	lang = lang.toLowerCase();
	if (lang.includes('ja')) return 'ja';
	else if (lang.includes('ko')) return 'ko';
	else if (lang.includes('zh')) return 'zh';
	else return 'en';
}

export default getConfig;