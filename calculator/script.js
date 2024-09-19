const display = document.querySelector('.answer');
const expression = document.querySelector('.expression');

function appendToDisplay(value) {
    if (display.textContent === '0' && value !== '.') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function clearDisplay() {
    display.textContent = '0';
    expression.textContent = '0';
}

function calculateResult() {
    try {
        const result = eval(display.textContent);
        display.textContent = result;
        expression.textContent = display.textContent;
    } catch (e) {
        display.textContent = 'Error';
    }
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Number keys
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    }

    // Operator keys
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    }

    // Special keys
    if (key === 'Enter' || key === '=') {
        calculateResult();
    }
    
    if (key === 'Backspace') {
        clearDisplay();
    }

    // Handle parentheses and decimal point
    if (key === '(') {
        appendToDisplay('(');
    }

    if (key === ')') {
        appendToDisplay(')');
    }

    if (key === '.') {
        appendToDisplay('.');
    }
});
