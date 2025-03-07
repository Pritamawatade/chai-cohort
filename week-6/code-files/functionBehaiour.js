// function declaration

function add(a, b) {
  return a + b;
}

// function expression
const subtract = function (a, b) {
  return a - b;
};

//arrow function
const multiply = (a, b) => a * b;

// first class function :  function can be passed as paramter and can be return

function applyOperation(a, b, operation) {
  return operation(a,b);
}

const res = applyOperation(
  3,
  4,
  (x, y) => x / y
);


//function called immegedly (immmegtly invoked function)
(function () {
  console.log("function called by automatically");
})();
