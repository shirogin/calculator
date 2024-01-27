import { useState, useEffect } from "react";
import "./App.css";

const operators = ["+", "-", "*", "/"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const decimal = ["."];
const parenthesis = ["(", ")"];

function App() {
	// create a calculator app that has input and buttons for numbers and operators
	// when the user clicks on a number, it should be displayed in the input
	// when the user clicks on an operator, it should be displayed in the input
	// when the user clicks on the equal button, the result should be displayed in the input
	// when the user clicks on the clear button, the input should be cleared
	// when the user clicks on the delete button, the last character should be removed from the input
	// when the user clicks on the decimal button, the decimal should be displayed in the input
	// has keyboard support

	const [input, setInput] = useState("");

	const [result, setResult] = useState("");
	// handle the number click
	const handleButtonClick = (e) => {
		setInput(input + e.target.value);
	};

	// evaluate the input
	const handleEqualClick = () => {
		setInput((oldInput) => {
			// evaluate the input
			try {
				const evaluatedInput = eval(oldInput);
				// set the result to the evaluated input
				setResult(evaluatedInput);
				// clear the input
			} catch (error) {
				console.error(error);
				setResult("ERROR");
				return oldInput;
			}
			return "";
		});
	};
	// clear the input
	const handleClearClick = () => {
		setInput("");
		setResult("");
	};
	// delete the last character
	const handleDeleteClick = () => {
		setInput((oldInput) => oldInput.slice(0, -1));
	};
	// handle keyboard events
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleEqualClick();
		}
		if (e.key === "Backspace") {
			setInput((oldInput) => oldInput.slice(0, -1));
		}
		if (e.key === "Delete") {
			setInput("");
			setResult("");
		}
		if (e.key === "Escape") {
			handleClearClick();
		}
		if (e.key === decimal[0]) {
			setInput((oldInput) => oldInput + ".");
		}
		if (operators.includes(e.key)) {
			setInput((oldInput) => oldInput + e.key);
		}
		if (numbers.includes(e.key)) {
			setInput((oldInput) => oldInput + e.key);
		}
		if (parenthesis.includes(e.key)) {
			setInput((oldInput) => oldInput + e.key);
		}
	};

	// on mount lifecycle ( when the app is loaded)
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		// on unmount lifecycle ( when the app is closed)
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (result === "ERROR") {
			setTimeout(() => {
				setResult("");
			}, 2000);
		}
	}, [result]);

	return (
		<div className="container">
			{/* {test} */}
			<div className="display-container">
				<div className="calculator-display">
					<div className="input">{input || "0"}</div>
					<div className="result">{result || "0"}</div>
				</div>
			</div>
			<div className="calculator-buttons">
				<button onClick={handleButtonClick} value="(" className="operator">
					(
				</button>
				<button onClick={handleButtonClick} value=")" className="operator">
					)
				</button>
				<button onClick={handleClearClick} value="clear" id="clear">
					clear
				</button>
				<button onClick={handleDeleteClick} value="delete" id="delete">
					delete
				</button>
				<button onClick={handleButtonClick} value="1">
					1
				</button>
				<button onClick={handleButtonClick} value="2">
					2
				</button>
				<button onClick={handleButtonClick} value="3">
					3
				</button>
				<button onClick={handleButtonClick} value="+" className="operator">
					+
				</button>
				<button onClick={handleButtonClick} value="4">
					4
				</button>
				<button onClick={handleButtonClick} value="5">
					5
				</button>
				<button onClick={handleButtonClick} value="6">
					6
				</button>
				<button onClick={handleButtonClick} value="-" className="operator">
					-
				</button>
				<button onClick={handleButtonClick} value="7">
					7
				</button>
				<button onClick={handleButtonClick} value="8">
					8
				</button>
				<button onClick={handleButtonClick} value="9">
					9
				</button>
				<button onClick={handleButtonClick} value="*" className="operator">
					*
				</button>
				<button onClick={handleButtonClick} value=".">
					.
				</button>

				<button onClick={handleButtonClick} value="0">
					0
				</button>
				{result === "ERROR" ? null : (
					<button onClick={handleEqualClick} value="=" id="equal">
						=
					</button>
				)}
				<button onClick={handleButtonClick} value="/" className="operator">
					/
				</button>
			</div>
		</div>
	);
}

export default App;
