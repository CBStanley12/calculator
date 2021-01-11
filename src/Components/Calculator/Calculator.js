import React, { Component } from 'react';
import './Calculator.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

class Calculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentValue: '0',
			currentEquation: [],
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
		let currentValue = this.state.currentValue;

		if (this.state.currentEquation.length === 3) {
			this.clearAll();
			currentValue = '0';
		}

		if (currentValue === '0') {
			currentValue = e.target.value;
		} else {
			currentValue += e.target.value;
		}

		this.setState({ currentValue: currentValue });
	}

	handleDecimalInput(e) {
		let currentValue = this.state.currentValue;

		if (this.state.currentEquation.length === 3) {
			this.clearAll();
			currentValue = '0';
		}

		if (!currentValue.includes('.')) { currentValue += '.'; }

		this.setState({ currentValue: currentValue });
	}

	handleOperatorInput(e) {
		let {currentValue, currentEquation} = this.state;

		if (currentEquation.length === 3) {
			currentEquation = [currentValue, e.target.value];
		} else {
			currentEquation.push(currentValue, e.target.value);
		}

		this.setState({ currentEquation: currentEquation });
		this.clear();
	}

	handleSignInput() {
		let currentValue = this.state.currentValue,
			value = (currentValue.includes('.')) ? parseFloat(currentValue) : parseInt(currentValue);
		
		if (this.state.currentEquation.length === 3) { this.setState({ currentEquation: [] }); }
		value = (value * -1).toString();
		this.setState({ currentValue: value });
	}

	handleCalulation() {
		let {currentValue, currentEquation} = this.state;
		currentEquation.push(currentValue);
		currentValue = this.calculateValue(currentEquation).toString();

		this.setState({
			currentValue: currentValue,
			currentEquation: currentEquation
		});
	}

	clear() {
		this.setState({ currentValue: '0' });
	}

	clearAll() {
		this.setState({
			currentValue: '0',
			currentEquation: []
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
		let {currentValue, currentEquation} = this.state;
		const btnClearAll = <Button id="clear-all" value="AC" cls="modifier" click={this.clearAll} />,
			btnClear = <Button id="clear" value="C" cls="modifier" click={this.clear} />;

		return (
			<div className="layout-calculator">
				<Display equation={currentEquation} value={currentValue} />

				{(currentValue !== '0' && currentEquation.length !== 3) ? btnClear : btnClearAll}
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