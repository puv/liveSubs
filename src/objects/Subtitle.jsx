/* eslint-disable no-undef */

import '../assets/css/App.css';
import '../assets/css/Fonts.css';

import Dictionary from '../assets/js/Dictionary';
import PropTypes from 'prop-types';
import React from 'react';

Subtitle.propTypes = {
	config: PropTypes.object.isRequired,
};

function Subtitle({ config }) {
	return (
		<div id='Subtitle'
			style={{
				fontSize: `${config.sub.size}pt`,
				fontFamily: config.sub.font,
				fontWeight: config.sub.weight,
				textAlign: config.pos_h,
				minHeight: `${config.sub.size}pt`
			}}>
			<div className="text_bg" id="SubBGText"
				style={{
					WebkitTextStroke: `${config.sub.border_width}pt ${config.sub.border_color}`,
				}}>
				{Dictionary['subtitle'][config.lang]}
			</div>
			<div className="text_fg" id="SubFGText"
				style={{
					color: config.sub.color,
				}}>
				{Dictionary['subtitle'][config.lang]}
			</div>
		</div>
	);
}

export default Subtitle;