// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

// Step 5 - Function declarations

console.log("---Function Declarations---");
function greet(name) {return "Hello, " + name + "!";}
console.log(greet("Maria")); // Output: Hello, Maria!

function area (width, height) {return width * height;}
console.log("Area of 4 x 5 = " + area(4, 5)); // Output: 20

// Step 6 - Function expressions + arrow functions

console.log("---Function Expressions & Arrow Functions---");

const multiply = function(a, b) {return a * b; };
const divide = (a, b) => {return a / b; }; // explicit return
const subtract = (a, b) => a - b; // implicit return
const square = n => n * n;
console.log("Multiply (3,6) = " + multiply(3, 6)); // Output: 18
console.log("Divide (20,5) = " + divide(20, 5)); // Output: 4
console.log("Square (7) = " + square(7)); // Output: 49

// Step 7 - Default Parameters & Rest Operators

console.log("---Default Parameters & Rest Operators---");
function greetUser(name, greeting = "Hello") {return greeting + ", " + name + "!";}
console.log(greetUser("Sam")); // uses default
console.log(greetUser("Sam", "Yo")); // overrides default

function sumAll(...numbers) {
    let total = 0;
    for (const n of numbers) {
        total += n;
    } return total;
}

console.log("sumAll(1, 2, 3) = " + sumAll(1, 2, 3)); 

// Step 8 - Callback functions

console.log("---Callback Functions---");

function processNumber(value, callback) {
    console.log("Processing " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("double -> " + processNumber(5, double)); // Output: 10
console.log("triple -> " + processNumber(5, triple)); // Output: 15


// Step 9 - Object methods with this

console.log("---Object Methods (this)---");
const product = {
    brand : "Acme",
    price : 12.5,
    quantity : 4,
    total() {return this.price * this.quantity;},
    describe() {
        return this.quantity + " " + this.brand + " $ @" + this.price + "= $" + this.total().toFixed(2);}
};

console .log("Total price = $" + product.total().toFixed(2)); // Output: 50.00
console.log(product.describe()); // Output: 4 Acme $ @12.5= $50.00