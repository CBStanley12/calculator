function Display({ equation, value }) {
	return (
		<div className="display">
			<p className="display_equation">{equation.join(' ')}</p>
			<h3 className="display_value">{value}</h3>
		</div>
	);
}

export default Display;