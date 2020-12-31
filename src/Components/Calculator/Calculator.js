import React, { Component } from 'react';
import './Calculator.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

class Calculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentValue: '',
			currentEquation: [],
		}

		this.handleNumberInput = this.handleNumberInput.bind(this);
	}

	handleNumberInput(e) {
		let value = this.state.currentValue,
			newValue = e.target.value;

		if (!isNaN(newValue) || (newValue === '.' && !value.includes('.'))) {
			value += newValue;
		}

		this.setState({ currentValue: value });

	}

	render() {
		return (
			<div className="layout-calculator">
				<Display equation={this.state.currentEquation} value={this.state.currentValue} />

				<Button id="clear" value="AC" cls="modifier" />
				<Button id="sign" value="±" cls="modifier" />
				<Button id="percent" value="%" cls="modifier" />
				<Button id="divide" value="÷" cls="operator" />

				<Button id="seven" value="7" cls="number" click={this.handleNumberInput} />
				<Button id="eight" value="8" cls="number" click={this.handleNumberInput} />
				<Button id="nine" value="9" cls="number" click={this.handleNumberInput} />
				<Button id="multiply" value="×" cls="operator" />

				<Button id="four" value="4" cls="number" click={this.handleNumberInput} />
				<Button id="five" value="5" cls="number" click={this.handleNumberInput} />
				<Button id="six" value="6" cls="number" click={this.handleNumberInput} />
				<Button id="subtract" value="−" cls="operator" />

				<Button id="one" value="1" cls="number" click={this.handleNumberInput} />
				<Button id="two" value="2" cls="number" click={this.handleNumberInput} />
				<Button id="three" value="3" cls="number" click={this.handleNumberInput} />
				<Button id="add" value="+" cls="operator" />

				<Button id="zero" value="0" cls="number" click={this.handleNumberInput} />
				<Button id="decimal" value="." cls="number" click={this.handleNumberInput} />
				<Button id="equal" value="=" cls="operator" />
			</div>
		);
	}
}

export default Calculator;