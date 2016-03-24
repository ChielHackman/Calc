(function() {
  function Calculator(displayId) {
    this.displayId = displayId;
    this.executeArray = [];
  }

  Calculator.prototype.updateDisplay = function() {
    document.getElementById(this.displayId).innerText = this.executeArray.join('');
  };

  Calculator.prototype.addToLast = function(input) {
    this.executeArray[this.executeArray.length - 1] += input;
  };

  Calculator.prototype.getLastItem = function() {
    return this.executeArray[this.executeArray.length - 1];
  };

  Calculator.prototype.handleNumber = function(number) {
    if (isNaN(this.getLastItem())) {
      this.executeArray.push(number.toString());
    }
    else {
      this.addToLast(number.toString());
    }
    this.updateDisplay();
  };

  Calculator.prototype.handleOperator = function(operator) {
    if (!isNaN(this.getLastItem())) {
      if (operator === '.') {
        this.addToLast(operator);
      }
      else {
        this.executeArray.push(operator);
      }
      this.updateDisplay();
    }
  };

  Calculator.prototype.allClear = function(clear) {
    this.executeArray = [];
    this.updateDisplay();
  };

  Calculator.prototype.clearEntry = function() {
    this.executeArray[this.executeArray.length - 1] = this.getLastItem().toString().slice(0, -1);
    if (this.getLastItem().length < 1) {
      this.executeArray.pop();
    }
    this.updateDisplay();
  };

  Calculator.prototype.getTotal = function() {
    if (isNaN(this.getLastItem())) {
      this.executeArray.pop();
    }
    var total = eval(this.executeArray.join(''));
    this.executeArray = [total];
    this.updateDisplay();
  };

  var jsCalculator = new Calculator('display');

  document.getElementById('ac').addEventListener('click', function() {
    jsCalculator.allClear();
  });

  document.getElementById('c').addEventListener('click', function(){
    jsCalculator.clearEntry();
  });

  document.getElementById('=').addEventListener('click', function(){
    jsCalculator.getTotal();
  });

  var operatorControls = document.getElementsByClassName('operatorbutton');
  var numberControls = document.getElementsByClassName('numberbutton');

    for (var i = 0; i < operatorControls.length; i++) {
      operatorControls[i].addEventListener('click', function() {
        jsCalculator.handleOperator(this.getAttribute('id'));
      });
    }

    for (var i = 0; i < numberControls.length; i++) {
      numberControls[i].addEventListener('click', function() {
        jsCalculator.handleNumber(this.getAttribute('id'));
      });
    }

    window.onkeyup = function(e) {
    e.preventDefault();
    var key = e.keyCode ? e.keyCode : e.which;

    if (key >= 96 && key <= 105) {
        jsCalculator.handleNumber(key - 96)
    } else if (key === 107) {
        jsCalculator.handleOperator('+');
    } else if (key === 109) {
        jsCalculator.handleOperator('-');
    } else if (key === 53) {
        jsCalculator.handleOperator('%');
    } else if (key === 106) {
        jsCalculator.handleOperator('*');
    } else if (key === 111) {
        jsCalculator.handleOperator('/');
    } else if (key === 110) {
        jsCalculator.handleOperator('.');
    } else if (key === 8) {
        jsCalculator.clearEntry();
    } else if (key === 46) {
        jsCalculator.allClear();
    } else if (key === 13) {
        jsCalculator.getTotal();
    }
}
})();
