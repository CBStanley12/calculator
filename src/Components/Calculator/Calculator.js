import React, { Component } from 'react';
import './Calculator.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

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
		this.calculatePercent = this.calculatePercent.bind(this);
		this.convertToNumber = this.convertToNumber.bind(this);
	}

	handleNumberInput(e) {
		if (this.state.equation.display.includes('=')) { this.clearAll(); }
		let term = this.state.term;

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

		if (equation.display.includes('=')) {
			equation.display = [term.display, operator];
			equation.value = [term.value, operator];
		} else {
			equation.display.push(term.display, operator);
			equation.value.push(term.value, operator);
		}

		this.setState({ equation: equation });
		this.clear();
	}

	handleSignInput() {
		let {value, equation} = this.state;
		
		if (equation.includes('=')) { this.clearAll(); }

		value = (value.includes('.')) ? parseFloat(value) : parseInt(value);
		value = (value * -1).toString();

		this.setState({
			value: value,
			displayValue: value
		});
	}

	handlePercentInput() {
		let {value, equation, displayValue} = this.state;

		if (equation.includes('=')) { this.clearAll(); }

		displayValue = (equation.length === 2) ? this.calculatePercent(value, equation[0]) : this.calculatePercent(value);
		value += '%';

		this.setState({
			value: value,
			displayValue: displayValue
		});
	}

	handleCalulation() {
		let {term, equation} = this.state;

		if (equation.display.includes('=')) {
			equation.display = [term.display, '='];
			equation.value = [term.value];
		} else {
			equation.display.push(term.display, '=');
			equation.value.push(term.value);

			term.value = this.calculateValue(equation.value);
			term.display = term.value.toLocaleString('en');
		}

		this.setState({
			term: term,
			equation: equation
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

	calculatePercent(b, a = '1') {
		a = (a.includes('.')) ? parseFloat(a) : parseInt(a);
		b = (b.includes('.')) ? parseFloat(b) : parseInt(b);

		return (a * (b / 100)).toString();
	}

	convertToNumber(term) {
		let termNum = term.replace(/,/g, '');
		return (termNum.includes('.')) ? parseFloat(termNum) : parseInt(termNum);
	}

	render() {
		let {term, equation} = this.state;
		const btnClearAll = <Button id="clear-all" value="AC" cls="modifier" click={this.clearAll} />,
			btnClear = <Button id="clear" value="C" cls="modifier" click={this.clear} />;

		return (
			<div className="layout-calculator">
				<Display equation={equation.display} value={term.display} />

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
			</div>
		);
	}
}

export default Calculator;