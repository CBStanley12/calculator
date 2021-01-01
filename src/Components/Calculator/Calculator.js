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
		this.handleCalculation = this.handleCalulation.bind(this);
		this.clear = this.clear.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.calculateValue = this.calculateValue.bind(this);
	}

	handleNumberInput(e) {
		let value = this.state.currentValue;

		if (value === '0') {
			value = e.target.value;
		} else {
			value += e.target.value;
		}

		this.setState({ currentValue: value });
	}

	handleDecimalInput(e) {
		let value = this.state.currentValue;

		if (!value.includes('.')) { value += e.target.value }

		this.setState({ currentValue: value });
	}

	handleOperatorInput(e) {
		let equation = this.state.currentEquation;
		equation.push(this.state.currentValue, e.target.value);

		this.setState({ currentEquation: equation });
		this.clear();
	}

	handleCalulation() {
		let {currentValue, currentEquation} = this.state;
		currentEquation.push(currentValue);
		currentValue = this.calculateValue(currentEquation);

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
		switch(oper) {
			case '+':
				return parseInt(a) + parseInt(b);
			case '−':
				return parseInt(a) - parseInt(b);
			case '×':
				return parseInt(a) * parseInt(b);
			case '÷':
				return parseInt(a) / parseInt(b);
			default:
				return;
		}
	}

	render() {
		let {currentValue, currentEquation} = this.state;
		const btnClearAll = <Button id="clear" value="AC" cls="modifier" click={this.clearAll} />,
			btnClear = <Button id="clear" value="C" cls="modifier" click={this.clear} />;

		return (
			<div className="layout-calculator">
				<Display equation={currentEquation.join(' ')} value={currentValue} />

				{(currentValue !== '0') ? btnClear : btnClearAll}
				<Button id="sign" value="±" cls="modifier" />
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