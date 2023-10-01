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
	'pause_timer': 500,
	'delete_timer': 0,
	'pos_h': 'left',
	'pos_v': 'bottom',
	'white_space': 'normal',
};

function getLang() {
	let lang = navigator.language || navigator.userLanguage || 'en';
	lang = lang.toLowerCase();
	if (lang.includes('ja')) return 'ja';
	else if (lang.includes('ko')) return 'ko';
	else if (lang.includes('zh')) return 'zh';
	else return 'en';
}

export default Config;