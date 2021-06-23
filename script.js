class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
        this.currentOperandEl = currentOperandEl;
        this.previousOperandEl= previousOperandEl;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = '';
        this.operation = null;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand?.includes('.'))  {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }

        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString()?.slice(0, -1);
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch(this.operation) {
            case '+':
                computation = previous + current
                break;
              case '-':
                computation = previous - current
                break;
              case '*':
                computation = previous * current
                break;
              case '÷':
                computation = previous / current
                break;
              default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = '';
    }

    getDisplayNumber(number){
   
        const stringNumber = number.toString()
        console.log(stringNumber)
        const intNumbers =  parseFloat(stringNumber.split('.')[0]);
        const decimalNumbers = stringNumber.split('.')[1];

        let display = '';
        
        if (isNaN(intNumbers)) {
            display = ''
        } else {
            display = intNumbers.toLocaleString('en', {
                maximumFractionDigits: 0
            })
            console.log(2)
        }

        if (decimalNumbers) {
            console.log(3)
            return `${display}.${decimalNumbers}`;
        } 

        return display;
    }

    updateDisplay() {
        this.currentOperandEl.innerText =
            this.getDisplayNumber(this.currentOperand)
        if(this.operation) {
            const display = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
            this.previousOperandEl.innerText = display ?? '';
        } else {
            this.previousOperandEl.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const previousOperandEl = document.querySelector('[data-previous-operand]');
const currentOperandEl = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandEl, currentOperandEl);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})