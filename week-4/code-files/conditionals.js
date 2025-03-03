function demonstrateConditionals(number) {
    if (number > 0) {
      console.log("The number is positive.");
    } else if (number < 0) {
      console.log("The number is negative.");
    } else {
      console.log("The number is zero.");
    }
  
    // Example of a ternary operator (a shorter way to write simple if/else)
    const isEven = number % 2 === 0 ? "even" : "odd";
    console.log(`The number is ${isEven}.`);
  
    // Example using switch statement
    switch (number) {
      case 1:
        console.log("The number is one.");
        break;
      case 2:
        console.log("The number is two.");
        break;
      case 3:
        console.log("The number is three.");
        break;
      default:
        console.log("The number is not 1, 2, or 3.");
    }
  }
  
  // Example usage:
  demonstrateConditionals(5);
  demonstrateConditionals(-2);
  demonstrateConditionals(0);
  demonstrateConditionals(2);
  demonstrateConditionals(7);