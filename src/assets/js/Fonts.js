const Fonts = [
	{
		'name': 'Mooli',
		'code': 'Mooli'
	},
	{
		'name': 'M PLUS 1p',
		'code': 'M PLUS 1p'
	},
	{
		'name': 'M PLUS Rounded 1c',
		'code': 'M PLUS Rounded 1c'
	},
	{
		'name': 'Mamelon',
		'code': 'Mamelon'
	},
	{
		'name': 'Yasashisa B',
		'code': 'YasashisaB'
	},
	{
		'name': 'Hui Font 29',
		'code': 'HuiFont29'
	},
	{
		'name': 'Hachi Maru Pop',
		'code': 'Hachi Maru Pop'
	},
	{
		'name': 'Mk POP',
		'code': 'MkPOP'
	},
	{
		'name': 'Banana Slip Plus',
		'code': 'bananaslipplus'
	},
	{
		'name': 'Katyou',
		'code': 'katyou'
	},
	{
		'name': 'Tanuki Magic',
		'code': 'TanukiMagic'
	},
	{
		'name': 'Hakidame',
		'code': 'hakidame'
	},
	{
		'name': 'Umeboshi',
		'code': 'umeboshi'
	},
	{
		'name': 'Jiyucho',
		'code': 'Jiyucho'
	},
	{
		'name': 'Hitmo R',
		'code': 'HitmoR'
	},
	{
		'name': 'Nishikiteki',
		'code': 'nishikiteki'
	},
	{
		'name': 'Yusei Magic',
		'code': 'Yusei Magic'
	},
	{
		'name': 'Nikumaru',
		'code': 'Nikumaru'
	},
	{
		'name': 'KTEGAKI',
		'code': 'KTEGAKI'
	},
	{
		'name': 'JK Gothic L',
		'code': 'JKGL'
	},
	{
		'name': 'Reggae One',
		'code': 'Reggae One'
	},
	{
		'name': 'Ohisama Font',
		'code': 'OhisamaFont'
	},
	{
		'name': 'Nukamiso',
		'code': 'nukamiso'
	},
	{
		'name': 'Roboto',
		'code': 'Roboto'
	}
].sort((a, b) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
});

export default Fonts;