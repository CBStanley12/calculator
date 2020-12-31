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
		this.handleOperatorInput = this.handleOperatorInput.bind(this);
	}

	handleNumberInput(e) {
		let value = this.state.currentValue,
			newValue = e.target.value;

		if (!isNaN(newValue) || (newValue === '.' && !value.includes('.'))) {
			value += newValue;
		}

		this.setState({ currentValue: value });
	}

	handleOperatorInput(e) {
		let equation = this.state.currentEquation;

		equation.push(this.state.currentValue);
		equation.push(e.target.value);

		this.setState({ currentEquation: equation });
	}

	render() {
		return (
			<div className="layout-calculator">
				<Display equation={this.state.currentEquation.join(' ')} value={this.state.currentValue} />

				<Button id="clear" value="AC" cls="modifier" />
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
				<Button id="decimal" value="." cls="number" click={this.handleNumberInput} />
				<Button id="equal" value="=" cls="operator" />
			</div>
		);
	}
}

export default Calculator;