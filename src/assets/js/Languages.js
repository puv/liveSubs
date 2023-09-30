const Languages = [
	{
		'code': 'ja',
		'name': '日本語'
	},
	{
		'code': 'en',
		'name': 'English'
	},
	{
		'code': 'ko',
		'name': '한국어'
	},
	{
		'code': 'zh-CN',
		'name': '普通话'
	},
	{
		'code': 'zh-TW',
		'name': '臺灣話'
	},
	{
		'code': 'fr',
		'name': 'Français'
	},
	{
		'code': 'it',
		'name': 'Italiano'
	},
	{
		'code': 'de',
		'name': 'Deutsch'
	},
	{
		'code': 'tr',
		'name': 'Türkçe'
	},
	{
		'code': 'pl',
		'name': 'Polski'
	},
	{
		'code': 'uk',
		'name': 'Українська'
	},
	{
		'code': 'ru',
		'name': 'Русский'
	},
	{
		'code': 'es',
		'name': 'Español'
	},
	{
		'code': 'pt',
		'name': 'Português'
	},
	{
		'code': 'nl',
		'name': 'Nederlands'
	},
	{
		'code': 'id',
		'name': 'हिन्दी'
	},
	{
		'code': 'vi',
		'name': 'Tiếng Việt'
	},
	{
		'code': 'th',
		'name': 'ภาษาไทย'
	},
	{
		'code': 'ar',
		'name': 'عربي'
	},
	{
		'code': 'so',
		'name': 'Soomaali'
	},
	{
		'code': 'lt',
		'name': 'Lietuvių'
	},
	{
		'code': 'lv',
		'name': 'Latviešu'
	},
	{
		'code': 'et',
		'name': 'Eesti'
	},
	{
		'code': 'eo',
		'name': 'Esperanto'
	},
	{
		'code': 'sv',
		'name': 'Svenska'
	},
	{
		'code': 'no',
		'name': 'Norsk'
	},
	{
		'code': 'fi',
		'name': 'Suomi'
	},
	{
		'code': 'da',
		'name': 'Dansk'
	},
	{
		'code': 'hu',
		'name': 'Magyar'
	},
	{
		'code': 'cs',
		'name': 'Čeština'
	},
	{
		'code': 'ro',
		'name': 'Română'
	},
	{
		'code': 'bg',
		'name': 'Български'
	},
	{
		'code': 'el',
		'name': 'Ελληνικά'
	},
	{
		'code': 'sr',
		'name': 'Српски'
	},
	{
		'code': 'hr',
		'name': 'Hrvatski'
	},
	{
		'code': 'mk',
		'name': 'Македонски'
	},
	{
		'code': 'sq',
		'name': 'Shqip'
	},
	{
		'code': 'hy',
		'name': 'Հայերեն'
	},
	{
		'code': 'ka',
		'name': 'ქართული'
	},
	{
		'code': 'az',
		'name': 'Azərbaycanca'
	},
	{
		'code': 'eu',
		'name': 'Euskara'
	},
	{
		'code': 'is',
		'name': 'Íslenska'
	},
	{
		'code': 'af',
		'name': 'Afrikaans'
	},
].sort((a, b) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
});

export default Languages;