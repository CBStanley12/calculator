import './History.css';
import Button from '../Button/Button';

function History({ list, state, toggle, clear }) {
	return (
		<aside className="layout-history history" data-state={`is-${state}`}>
			<Button id="toggle" value="Close" cls="history" click={toggle} />

			<div className={(list.length === 0) ? "history_list empty" : "history_list"}>
				<ul>
					{(list.length === 0) ? "No History" : list.map((entry, key) => FormatEntry(key, entry))}
				</ul>
			</div>

			<footer className="history_footer">
				<Button id="clear-history" value="Clear History" cls="clear" click={clear} />
			</footer>
		</aside>
	);
}

function FormatEntry(id, [equation, value]) {
	return (
		<li id={id} className="list-entry">
			<p className="list-entry_equation">{equation}</p>
			<p className="list-entry_value">{value}</p>
		</li>
	);
}

export default History;