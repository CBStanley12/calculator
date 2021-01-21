import React, { Component } from 'react';
import './Calculator.css';
import Button from '../Button/Button';
import Display from '../Display/Display';
import History from '../History/History';

class Calculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: {
				display: '0',
				value: 0
			},
			equation: {
				display: [],
				value: []
			},
			history: {
				state: 'hidden',
				list: []
			}
		}

		this.handleNumberInput = this.handleNumberInput.bind(this);
		this.handleDecimalInput = this.handleDecimalInput.bind(this);
		this.handleOperatorInput = this.handleOperatorInput.bind(this);
		this.handleSignInput = this.handleSignInput.bind(this);
		this.handlePercentInput = this.handlePercentInput.bind(this);
		this.handleCalculation = this.handleCalulation.bind(this);
		this.clear = this.clear.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.calculateValue = this.calculateValue.bind(this);
		this.convertToNumber = this.convertToNumber.bind(this);
		this.toggleHistory = this.toggleHistory.bind(this);
		this.clearHistory = this.clearHistory.bind(this);
	}

	handleNumberInput(e) {
		let term = this.state.term;
		if (this.state.equation.display.includes('=')) {
			this.clearAll();
			term = { display: '0', value: 0 };
		}

		if (term.display === '0') {
			term.display = e.target.value;
		} else {
			term.display += e.target.value;
		}

		term.value = this.convertToNumber(term.display);
		term.display = term.value.toLocaleString('en');

		this.setState({ term: term });
	}

	handleDecimalInput() {
		if (this.state.equation.display.includes('=')) { this.clearAll(); }
		let display = this.state.term.display;

		if (!display.includes('.')) { display += '.'; }

		this.setState({ term: { display: display } });
	}

	handleOperatorInput(e) {
		let {term, equation} = this.state,
			operator = e.target.value;
		
		if (equation.display.length === 2 && term.display !== '0') {
			this.handleCalculation();
		}

		if (equation.display.includes('=')) {
			equation.display = [term.display, operator];
			equation.value = [term.value, operator];
		} else if (equation.display[1] && term.display === '0') {
			equation.display[1] = operator;
			equation.value[1] = operator;
	 	} else {
			equation.display.push(term.display, operator);
			equation.value.push(term.value, operator);
		}

		this.setState({ equation: equation });
		this.clear();
	}

	handleSignInput() {
		let term = this.state.term;
		if (this.state.equation.display.includes('=')) { this.clearAll(); }

		term.value *= -1;
		term.display = term.value.toLocaleString('en');

		this.setState({ term: term });
	}

	handlePercentInput() {
		let {term, equation} = this.state;
		if (equation.display.includes('=')) { this.clearAll(); }

		term.display += '%';
		if (equation.display.length === 2) {
			term.value = (equation.value[0] * (term.value / 100));
		} else {
			term.value = (term.value / 100);
		}

		this.setState({ term: term });
	}

	handleCalulation() {
		let {term, equation, history} = this.state;

		if (equation.display.includes('=')) {
			equation.display = [term.display, '='];
			equation.value = [term.value];
		} else {
			equation.display.push(term.display, '=');
			equation.value.push(term.value);

			term.value = this.calculateValue(equation.value);
			term.display = term.value.toLocaleString('en');

			history.list.push([equation.display.slice(0, -1).join(' '), `= ${term.display}`]);
		}

		this.setState({
			term: term,
			equation: equation,
			history: history
		});
	}

	clear() {
		this.setState({ term: { display: '0', value: 0 } });
	}

	clearAll() {
		this.setState({
			term: { display: '0', value: 0 },
			equation: { display: [], value: [] }
		});
	}

	calculateValue([a, oper, b]) {
		switch(oper) {
			case '+':
				return a + b;
			case '−':
				return a - b;
			case '×':
				return a * b;
			case '÷':
				return a / b;
			default:
				return;
		}
	}

	convertToNumber(term) {
		let termNum = term.replace(/,/g, '');
		return (termNum.includes('.')) ? parseFloat(termNum) : parseInt(termNum);
	}

	toggleHistory() {
		let history = this.state.history;
		history.state = (history.state === 'hidden') ? 'active' : 'hidden';
		this.setState({ history: history });
	}

	clearHistory() {
		let history = this.state.history;
		history.list = [];
		this.setState({ history: history });
	}

	render() {
		let {term, equation, history} = this.state;
		const btnClearAll = <Button id="clear-all" value="AC" cls="modifier" click={this.clearAll} />,
			btnClear = <Button id="clear" value="C" cls="modifier" click={this.clear} />;

		return (
			<div className="layout-container">
				<main className="calculator" data-history={`is-${history.state}`}>
					{(history.state === 'active') ? "" : <Button id="toggle" value="view history" cls="history" click={this.toggleHistory} />}

					<Display equation={equation.display} value={(term.display.includes('%')) ? term.value.toLocaleString('en') : term.display} />

					{(term.display !== '0' && !equation.display.includes('=')) ? btnClear : btnClearAll}
					<Button id="sign" value="±" cls="modifier" click={this.handleSignInput} />
					<Button id="percent" value="%" cls="modifier" click={this.handlePercentInput} />
					<Button id="divide" value="÷" cls="operator" click={this.handleOperatorInput} />

					<Button id="seven" value="7" cls="number" click={this.handleNumberInput} />
					<Button id="eight" value="8" cls="number" click={this.handleNumberInput} />
					<Button id="nine" value="9" cls="number" click={this.handleNumberInput} />
					<Button id="multiply" value="×" cls="operator" click={this.handleOperatorInput} />

					<Button id="four" value="4" cls="number" click={this.handleNumberInput} />
					<Button id="five" value="5" cls="number" click={this.handleNumberInput} />
					<Button id="six" value="6" cls="number" click={this.handleNumberInput} />
					<Button id="subtract" value="−" cls="operator" click={this.handleOperatorInput} />

					<Button id="one" value="1" cls="number" click={this.handleNumberInput} />
					<Button id="two" value="2" cls="number" click={this.handleNumberInput} />
					<Button id="three" value="3" cls="number" click={this.handleNumberInput} />
					<Button id="add" value="+" cls="operator" click={this.handleOperatorInput} />

					<Button id="zero" value="0" cls="number" click={this.handleNumberInput} />
					<Button id="decimal" value="." cls="number" click={this.handleDecimalInput} />
					<Button id="equal" value="=" cls="operator" click={this.handleCalculation} />
				</main>

				<History list={history.list} state={history.state} toggle={this.toggleHistory} clear={this.clearHistory} />
			</div>
		);
	}
}

export default Calculator;