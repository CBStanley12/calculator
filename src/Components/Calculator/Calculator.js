import React, { Component } from 'react';
import './Calculator.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

class Calculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '0',
			equation: [],
		}

		this.handleNumberInput = this.handleNumberInput.bind(this);
		this.handleDecimalInput = this.handleDecimalInput.bind(this);
		this.handleOperatorInput = this.handleOperatorInput.bind(this);
		this.handleSignInput = this.handleSignInput.bind(this);
		this.handleCalculation = this.handleCalulation.bind(this);
		this.clear = this.clear.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.calculateValue = this.calculateValue.bind(this);
	}

	handleNumberInput(e) {
		let {value, equation} = this.state;

		if (equation.includes('=')) {
			this.clearAll();
			value = '0';
		}

		if (value === '0') {
			value = e.target.value;
		} else {
			value += e.target.value;
		}

		this.setState({ value: value });
	}

	handleDecimalInput() {
		let {value, equation} = this.state;

		if (equation.includes('=')) {
			this.clearAll();
			value = '0';
		}

		if (!value.includes('.')) { value += '.'; }

		this.setState({ value: value });
	}

	handleOperatorInput(e) {
		let {value, equation} = this.state;

		if (equation.includes('=')) {
			equation = [value, e.target.value];
		} else {
			equation.push(value, e.target.value);
		}

		this.setState({ equation: equation });
		this.clear();
	}

	handleSignInput() {
		let {value, equation} = this.state;
		
		if (equation.includes('=')) { this.clearAll(); }

		value = (value.includes('.')) ? parseFloat(value) : parseInt(value);
		value = (value * -1).toString();

		this.setState({ value: value });
	}

	handleCalulation() {
		let {value, equation} = this.state;

		equation.push(value, '=');
		value = this.calculateValue(equation).toString();

		this.setState({
			value: value,
			equation: equation
		});
	}

	clear() {
		this.setState({ value: '0' });
	}

	clearAll() {
		this.setState({
			value: '0',
			equation: []
		});
	}

	calculateValue([a, oper, b]) {
		a = (a.includes('.')) ? parseFloat(a) : parseInt(a);
		b = (b.includes('.')) ? parseFloat(b) : parseInt(b);

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

	render() {
		let {value, equation} = this.state;
		const btnClearAll = <Button id="clear-all" value="AC" cls="modifier" click={this.clearAll} />,
			btnClear = <Button id="clear" value="C" cls="modifier" click={this.clear} />;

		return (
			<div className="layout-calculator">
				<Display equation={equation} value={value} />

				{(value !== '0' && equation.length !== 3) ? btnClear : btnClearAll}
				<Button id="sign" value="±" cls="modifier" click={this.handleSignInput} />
				<Button id="percent" value="%" cls="modifier" />
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