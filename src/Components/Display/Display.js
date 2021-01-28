import React, { useEffect } from 'react';

function Display({ equation, value }) {
	useEffect(() => {
		const DISPLAY = getComputedStyle(document.querySelector('.display')),
			FONT = 'normal 1px orbitron';

		let displayWidth = parseFloat(DISPLAY.width) - (parseFloat(DISPLAY.paddingLeft) + parseFloat(DISPLAY.paddingRight)),
			equationWidth = parseFloat(calculateTextWidth(equation, FONT)),
			valueWidth = parseFloat(calculateTextWidth(value, FONT));

		let equationFontSize = ((displayWidth * 0.85) / equationWidth).toFixed(3),
			valueFontSize = ((displayWidth * 0.95) / valueWidth).toFixed(3),
			maxFontSize = {
				equation: 28,
				value: 80
			};

		if (window.innerWidth <= 600) { maxFontSize = { equation: 20, value: 54}; }

		document.documentElement.style.setProperty('--fs-equation', `${(equationFontSize < maxFontSize.equation) ? equationFontSize : maxFontSize.equation}px`);
		document.documentElement.style.setProperty('--fs-value', `${(valueFontSize < maxFontSize.value) ? valueFontSize : maxFontSize.value}px`);
	});

	return (
		<div className="display">
			<p className="display_equation">{equation}</p>
			<h3 className="display_value">{value}</h3>
		</div>
	);
}

function calculateTextWidth(char, font) {
	let canvas = calculateTextWidth.canvas || (calculateTextWidth.canvas = document.createElement('canvas'));
	let context = canvas.getContext('2d');
	context.font = font;

	let metrics = context.measureText(char);
	return parseFloat(metrics.width);
}

export default Display;