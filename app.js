document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('equals')) {
                calculate();
            }
        });
    });

    function handleNumber(value) {
        if (currentInput === '0' && value === '0') return;
        currentInput = currentInput === '0' ? value : currentInput + value;
        updateDisplay(currentInput);
    }

    function handleOperator(value) {
        if (value === 'C') {
            clear();
            return;
        }

        if (operator && currentInput) {
            calculate();
        }

        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay(currentInput);
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    function updateDisplay(value) {
        resultDisplay.textContent = value;
    }
});