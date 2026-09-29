// IC10 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

// Step 5 - variables and constants

const city = "Alamo";
const country = "USA";
let population = 20000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);

// Step 6 - a decision statement
if (population > 1000000) {
    console.log(city + " is a metropolis.");
} else {
    console.log(city + " is a growing city.");
}

// Step 7 - Boolean
let isLoggedIn = false;

if (isLoggedIn) {
    console.log("Welcome back!");
}else {
    console.log("Please log in");
}

// Step 8 - truthy and falsy 

let username = false;

if (username) {
    console.log("Username is accepted: " + username);
}else {
    console.log("Username is required");
}

// Step 9 - combined logic
const hasAccount = true;
const isEmailVerified = false;
const agreedToTerms = true;

if (hasAccount && isEmailVerified || agreedToTerms) {
    console.log("Registration allowed");
}else {
    console.log("Registration blocked");
}

const itemCount = 0;
if (itemCount) {
    console.log("Cart has " + itemCount + " items.");
} else {
    console.log("Cart is empty.");
}

console.log(null == undefined); 
console.log(null === undefined);