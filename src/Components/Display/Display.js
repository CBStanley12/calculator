function Display({ equation, value }) {
	return (
		<div className="display">
			<p className="display_equation">{equation.map(val => (!isNaN(val)) ? formatNumber(val) : val).join(' ')}</p>
			<h3 className="display_value">{formatNumber(value)}</h3>
		</div>
	);
}

function formatNumber(num) {
	let number;

	if (num.includes('.')) {
		number = (num === '0.') ? num : parseFloat(num);
	} else {
		number = parseInt(num);
	}

	return number.toLocaleString('en');
}

export default Display;