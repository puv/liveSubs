/* eslint-disable no-undef */

import '../assets/css/App.css';
import '../assets/css/Fonts.css';

import Dictionary from '../assets/js/Dictionary';
import PropTypes from 'prop-types';

Translation.propTypes = {
	config: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

function Translation({ config, index }) {
	return (
		<div id="Translation" data-tr={index} data-lang={config.translations[index].lang}
			style={{
				fontSize: `${config.translations[index].size}pt`,
				fontFamily: config.translations[index].font,
				fontWeight: config.translations[index].weight,
				textAlign: config.pos_h,
				minHeight: `${config.translations[index].size}pt`,
			}}>
			<div className="text_bg" id="TBg" data-tr={index}
				style={{
					WebkitTextStroke: `${config.translations[index].border_width}pt ${config.translations[index].border_color}`,
				}}>
				{Dictionary['translation'][config.lang] + ' ' + (index + 1)}
			</div>
			<div className="text_fg" id="TFg" data-tr={index}
				style={{
					color: config.translations[index].color,
				}}>
				{Dictionary['translation'][config.lang] + ' ' + (index + 1)}
			</div>
		</div>
	);
}

export default Translation;