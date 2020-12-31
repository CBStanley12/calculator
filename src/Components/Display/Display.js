function Display({ equation, value }) {
	return (
		<div className="display">
			<p className="display_equation">{equation}</p>
			<h3 className="display_value">{(value) ? value : 0}</h3>
		</div>
	);
}

export default Display;