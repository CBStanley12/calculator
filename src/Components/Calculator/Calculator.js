import React, { Component } from 'react';
import './Calculator.css';
import Button from '../Button/Button';
import Display from '../Display/Display';

class Calculator extends Component {
	render() {
		return (
			<div className="layout-calculator">
				<Display />

				<Button id="clear" value="AC" cls="modifier" />
				<Button id="sign" value="±" cls="modifier" />
				<Button id="percent" value="%" cls="modifier" />
				<Button id="divide" value="÷" cls="operator" />

				<Button id="seven" value="7" cls="number" />
				<Button id="eight" value="8" cls="number" />
				<Button id="nine" value="9" cls="number" />
				<Button id="multiply" value="×" cls="operator" />

				<Button id="four" value="4" cls="number" />
				<Button id="five" value="5" cls="number" />
				<Button id="six" value="6" cls="number" />
				<Button id="subtract" value="−" cls="operator" />

				<Button id="one" value="1" cls="number" />
				<Button id="two" value="2" cls="number" />
				<Button id="three" value="3" cls="number" />
				<Button id="add" value="+" cls="operator" />

				<Button id="zero" value="0" cls="number" />
				<Button id="decimal" value="." cls="number" />
				<Button id="equal" value="=" cls="operator" />
			</div>
		);
	}
}

export default Calculator;