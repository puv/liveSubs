const Languages = [
	{
		'code': 'ja',
		'name': {
			'native': '日本語',
			'en': 'Japanese',
			'ja': '日本語',
			'ko': '일본어',
			'zh-CN': '日语'
		}
	},
	{
		'code': 'en',
		'name': {
			'native': 'English',
			'en': 'English',
			'ja': '英語',
			'ko': '영어',
			'zh-CN': '英语'
		}
	},
	{
		'code': 'ko',
		'name': {
			'native': '한국어',
			'en': 'Korean',
			'ja': '韓国語',
			'ko': '한국어',
			'zh-CN': '韩语'
		}
	},
	{
		'code': 'zh-CN',
		'name': {
			'native': '普通话',
			'en': 'Chinese',
			'ja': '中国語',
			'ko': '중국어',
			'zh-CN': '中文'
		}
	},
	{
		'code': 'zh-TW',
		'name': {
			'native': '臺灣話',
			'en': 'Taiwanese',
			'ja': '台湾語',
			'ko': '대만어',
			'zh-CN': '台湾语'
		}
	},
	{
		'code': 'fr',
		'name': {
			'native': 'Français',
			'en': 'French',
			'ja': 'フランス語',
			'ko': '프랑스어',
			'zh-CN': '法语'
		}
	},
	{
		'code': 'it',
		'name': {
			'native': 'Italiano',
			'en': 'Italian',
			'ja': 'イタリア語',
			'ko': '이탈리아어',
			'zh-CN': '意大利语'
		}
	},
	{
		'code': 'de',
		'name': {
			'native': 'Deutsch',
			'en': 'German',
			'ja': 'ドイツ語',
			'ko': '독일어',
			'zh-CN': '德语'
		}
	},
	{
		'code': 'tr',
		'name': {
			'native': 'Türkçe',
			'en': 'Turkish',
			'ja': 'トルコ語',
			'ko': '터키어',
			'zh-CN': '土耳其语'
		}
	},
	{
		'code': 'pl',
		'name': {
			'native': 'Polski',
			'en': 'Polish',
			'ja': 'ポーランド語',
			'ko': '폴란드어',
			'zh-CN': '波兰语'
		}
	},
	{
		'code': 'uk',
		'name': {
			'native': 'Українська',
			'en': 'Ukrainian',
			'ja': 'ウクライナ語',
			'ko': '우크라이나어',
			'zh-CN': '乌克兰语'
		}
	},
	{
		'code': 'ru',
		'name': {
			'native': 'Русский',
			'en': 'Russian',
			'ja': 'ロシア語',
			'ko': '러시아어',
			'zh-CN': '俄语'
		}
	},
	{
		'code': 'es',
		'name': {
			'native': 'Español',
			'en': 'Spanish',
			'ja': 'スペイン語',
			'ko': '스페인어',
			'zh-CN': '西班牙语'
		}
	},
	{
		'code': 'pt',
		'name': {
			'native': 'Português',
			'en': 'Portuguese',
			'ja': 'ポルトガル語',
			'ko': '포르투갈어',
			'zh-CN': '葡萄牙语'
		}
	},
	{
		'code': 'nl',
		'name': {
			'native': 'Nederlands',
			'en': 'Dutch',
			'ja': 'オランダ語',
			'ko': '네덜란드어',
			'zh-CN': '荷兰语'
		}
	},
	{
		'code': 'id',
		'name': {
			'native': 'हिन्दी',
			'en': 'Hindi',
			'ja': 'ヒンディー語',
			'ko': '힌디어',
			'zh-CN': '印地语'
		}
	},
	{
		'code': 'vi',
		'name': {
			'native': 'Tiếng Việt',
			'en': 'Vietnamese',
			'ja': 'ベトナム語',
			'ko': '베트남어',
			'zh-CN': '越南语'
		}
	},
	{
		'code': 'th',
		'name': {
			'native': 'ภาษาไทย',
			'en': 'Thai',
			'ja': 'タイ語',
			'ko': '태국어',
			'zh-CN': '泰语'
		}
	},
	{
		'code': 'ar',
		'name': {
			'native': 'عربي',
			'en': 'Arabic',
			'ja': 'アラビア語',
			'ko': '아랍어',
			'zh-CN': '阿拉伯语'
		}
	},
	{
		'code': 'so',
		'name': {
			'native': 'Soomaali',
			'en': 'Somali',
			'ja': 'ソマリ語',
			'ko': '소말리아어',
			'zh-CN': '索马里语'
		}
	},
	{
		'code': 'lt',
		'name': {
			'native': 'Lietuvių',
			'en': 'Lithuanian',
			'ja': 'リトアニア語',
			'ko': '리투아니아어',
			'zh-CN': '立陶宛语'
		}
	},
	{
		'code': 'lv',
		'name': {
			'native': 'Latviešu',
			'en': 'Latvian',
			'ja': 'ラトビア語',
			'ko': '라트비아어',
			'zh-CN': '拉脱维亚语'
		}
	},
	{
		'code': 'et',
		'name': {
			'native': 'Eesti',
			'en': 'Estonian',
			'ja': 'エストニア語',
			'ko': '에스토니아어',
			'zh-CN': '爱沙尼亚语'
		}
	},
	{
		'code': 'eo',
		'name': {
			'native': 'Esperanto',
			'en': 'Esperanto',
			'ja': 'エスペラント語',
			'ko': '에스페란토어',
			'zh-CN': '世界语'
		}
	},
	{
		'code': 'sv',
		'name': {
			'native': 'Svenska',
			'en': 'Swedish',
			'ja': 'スウェーデン語',
			'ko': '스웨덴어',
			'zh-CN': '瑞典语'
		}
	},
	{
		'code': 'no',
		'name': {
			'native': 'Norsk',
			'en': 'Norwegian',
			'ja': 'ノルウェー語',
			'ko': '노르웨이어',
			'zh-CN': '挪威语'
		}
	},
	{
		'code': 'fi',
		'name': {
			'native': 'Suomi',
			'en': 'Finnish',
			'ja': 'フィンランド語',
			'ko': '핀란드어',
			'zh-CN': '芬兰语'
		}
	},
	{
		'code': 'da',
		'name': {
			'native': 'Dansk',
			'en': 'Danish',
			'ja': 'デンマーク語',
			'ko': '덴마크어',
			'zh-CN': '丹麦语'
		}
	},
	{
		'code': 'hu',
		'name': {
			'native': 'Magyar',
			'en': 'Hungarian',
			'ja': 'ハンガリー語',
			'ko': '헝가리어',
			'zh-CN': '匈牙利语'
		}
	},
	{
		'code': 'cs',
		'name': {
			'native': 'Čeština',
			'en': 'Czech',
			'ja': 'チェコ語',
			'ko': '체코어',
			'zh-CN': '捷克语'
		}
	},
	{
		'code': 'ro',
		'name': {
			'native': 'Română',
			'en': 'Romanian',
			'ja': 'ルーマニア語',
			'ko': '루마니아어',
			'zh-CN': '罗马尼亚语'
		}
	},
	{
		'code': 'bg',
		'name': {
			'native': 'Български',
			'en': 'Bulgarian',
			'ja': 'ブルガリア語',
			'ko': '불가리아어',
			'zh-CN': '保加利亚语'
		}
	},
	{
		'code': 'el',
		'name': {
			'native': 'Ελληνικά',
			'en': 'Greek',
			'ja': 'ギリシャ語',
			'ko': '그리스어',
			'zh-CN': '希腊语'
		}
	},
	{
		'code': 'sr',
		'name': {
			'native': 'Српски',
			'en': 'Serbian',
			'ja': 'セルビア語',
			'ko': '세르비아어',
			'zh-CN': '塞尔维亚语'
		}
	},
	{
		'code': 'hr',
		'name': {
			'native': 'Hrvatski',
			'en': 'Croatian',
			'ja': 'クロアチア語',
			'ko': '크로아티아어',
			'zh-CN': '克罗地亚语'
		}
	},
	{
		'code': 'mk',
		'name': {
			'native': 'Македонски',
			'en': 'Macedonian',
			'ja': 'マケドニア語',
			'ko': '마케도니아어',
			'zh-CN': '马其顿语'
		}
	},
	{
		'code': 'sq',
		'name': {
			'native': 'Shqip',
			'en': 'Albanian',
			'ja': 'アルバニア語',
			'ko': '알바니아어',
			'zh-CN': '阿尔巴尼亚语'
		}
	},
	{
		'code': 'hy',
		'name': {
			'native': 'Հայերեն',
			'en': 'Armenian',
			'ja': 'アルメニア語',
			'ko': '아르메니아어',
			'zh-CN': '亚美尼亚语'
		}
	},
	{
		'code': 'ka',
		'name': {
			'native': 'ქართული',
			'en': 'Georgian',
			'ja': 'グルジア語',
			'ko': '조지아어',
			'zh-CN': '格鲁吉亚语'
		}
	},
	{
		'code': 'az',
		'name': {
			'native': 'Azərbaycanca',
			'en': 'Azerbaijani',
			'ja': 'アゼルバイジャン語',
			'ko': '아제르바이잔어',
			'zh-CN': '阿塞拜疆语'
		}
	},
	{
		'code': 'eu',
		'name': {
			'native': 'Euskara',
			'en': 'Basque',
			'ja': 'バスク語',
			'ko': '바스크어',
			'zh-CN': '巴斯克语'
		}
	},
	{
		'code': 'is',
		'name': {
			'native': 'Íslenska',
			'en': 'Icelandic',
			'ja': 'アイスランド語',
			'ko': '아이슬란드어',
			'zh-CN': '冰岛语'
		}
	},
	{
		'code': 'af',
		'name': {
			'native': 'Afrikaans',
			'en': 'Afrikaans',
			'ja': 'アフリカーンス語',
			'ko': '아프리칸스어',
			'zh-CN': '南非语'
		}
	},
].sort((a, b) => {
	if (a.name.native < b.name.native) return -1;
	if (a.name.native > b.name.native) return 1;
	return 0;
});

export default Languages;