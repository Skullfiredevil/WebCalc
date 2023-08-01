function append(value) {
  document.getElementById('result').value += value;
}

function clearScreen() {
  document.getElementById('result').value = '';
}

function backspace() {
  let result = document.getElementById('result').value;
  document.getElementById('result').value = result.slice(0, -1);
}

function calculate() {
  let result = document.getElementById('result').value;
  let expression = result; // Store the entire expression before modification

  // Check if the input contains the '%' symbol
  if (result.includes('%')) {
    // Replace all occurrences of 'x + y%' with 'x + (x * y/100)'
    // Replace all occurrences of 'x - y%' with 'x - (x * y/100)'
    result = result.replace(/(\d+\.?\d*)([+\-])\s*(\d+\.?\d*)%/g, function(match, p1, p2, p3) {
      let number = parseFloat(p1);
      let operator = p2;
      let percentageValue = parseFloat(p3) / 100;
      if (operator === '+') {
        return number + (number * percentageValue);
      } else {
        return number - (number * percentageValue);
      }
    });

    // Replace all occurrences of 'x * y%' with 'x * y/100'
    // Replace all occurrences of 'x / y%' with 'x / (y/100)'
    result = result.replace(/(\d+\.?\d*)\s*([*/])\s*(\d+\.?\d*)%/g, function(match, p1, p2, p3) {
      let number = parseFloat(p1);
      let operator = p2;
      let percentageValue = parseFloat(p3) / 100;
      if (operator === '*') {
        return number * percentageValue;
      } else {
        return number / percentageValue;
      }
    });

    // Evaluate the modified expression using JavaScript's eval()
    let output = eval(result);

    // Update the input field with the calculated result
    document.getElementById('result').value = output;

    // Update the result box with the current result
    document.getElementById('current-result').textContent = ' = ' + output;
    document.getElementById('result-box').style.display = 'block';

    // Add the expression to history instead of the entire expression and result
    addToHistory(expression, output);

    // Show the history section after the first calculation is made
    document.getElementById('history-section').style.display = 'block';
  } else {
    // Evaluate the expression normally if no '%' symbol is present
    let output = eval(result);
    document.getElementById('result').value = output;

    // Update the result box with the current result
    document.getElementById('current-result').textContent = ' = ' + output;
    document.getElementById('result-box').style.display = 'block';

    // Add the expression to history instead of the entire expression and result
    addToHistory(expression, output);

    // Show the history section after the first calculation is made
    document.getElementById('history-section').style.display = 'block';
  }
}

function squareRoot() {
  let result = document.getElementById('result').value;
  let output = Math.sqrt(result);
  document.getElementById('result').value = output;

  // Update the result box with the current result
  document.getElementById('current-result').textContent = ' = ' + output;
  document.getElementById('result-box').style.display = 'block';

  // Add the expression to history
  addToHistory('√(' + result + ')', output);

  // Show the history section after the first calculation is made
  document.getElementById('history-section').style.display = 'block';
}

function addToHistory(expression, result) {
  let historyList = document.getElementById('history-list');
  let listItem = document.createElement('li');
  listItem.textContent = expression + ' = ' + result;

  // Reverse the order by adding new items at the beginning of the list
  historyList.insertBefore(listItem, historyList.firstChild);
}

// Event listener to handle keyboard input
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key.match(/[0-9]|\.|[+\-*/%]|Enter|Backspace|Escape/)) {
    event.preventDefault();
    if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === 'Escape') {
      clearScreen();
    } else {
      append(key);
    }
  }
});
